import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AppSettings } from './../../config';
import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orderSu: boolean = true;
  deliveryA: boolean = false;
  deliveryOp: boolean = false;
  paymentM: boolean = false;
  Promo: string;
  cartSummary: string;
  orderId: string;
  orders = [];
  data = {}
  cart: string;
  checkout: string;
  userName: string;
  id: string;
  timeSlot: string;
  dateSlot: string;
  summarySum;
  url;
  promoCode;
  coupon;
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.promoCode = params.promoCode;
      console.log(params);
    });
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.userName = JSON.parse(localStorage.userName);
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = '';
    }
  }
  order() {
    this.orderSu = true;
    this.deliveryA = this.deliveryOp = this.paymentM = false
  }
  delAdd() {
    this.deliveryA = true;
    this.orderSu = this.deliveryOp = this.paymentM = false
  }
  delOpt() {
    this.deliveryOp = true;
    this.orderSu = this.deliveryA = this.paymentM = false
  }
  paymentMethod() {
    this.paymentM = true;
    this.orderSu = this.deliveryOp = this.deliveryA = false
  }
  postPromo(event) {
    var inData = {
      _session: localStorage.session,
      coupon_code: event,
      id_order: JSON.stringify(this.orderId)
    }
    this.loginService.postPromo(inData).subscribe(response => {
      this.Promo = response.json();
      if (response.status === "success") {
        swal('promo applied successfully', '', 'success');
      }
      else {
        swal("invalid promo code", "", "error")
      }
      console.log(this.Promo);

    });
  }
  checkoutSummary() {
    var inData = {
      _session: localStorage.session,
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      lang: "en",
    }
    this.loginService.checkoutSummary(inData).subscribe(response => {
      this.cartSummary = response.json().orders;
      this.cart = response.json().cart;
      this.orderId = response.json().orders[0].order_id;
      this.dateSlot = response.json().orders[0].deliveryslot;
      this.timeSlot = response.json().orders[0].deliveryslot[0].times;
      this.summarySum = response.json().summary;
      console.log(this.orderId);
    }, err => {
      swal(err.message, "", "error")
    })
  }
  cartCheckout(grand) {
    this.data = {
      "id_order": JSON.stringify(this.orderId),
      "total_paid": JSON.stringify(grand),
      "pay_type": "cod",
      "pay_option": "COD",
      "express": 1
    }
    this.orders.push(this.data);
    console.log(this.orders);
    var inData = {
      _id: this.id,
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      lang: "en",
      orders: this.orders
    }
    this.loginService.checkOut(inData).subscribe(response => {
      this.checkout = response.json();
      swal('order placed successfully', '', 'success');
      this.router.navigate(["/"]);
    }, err => {
      console.log(err)
    })
  }
  ngOnInit() {
    this.url = AppSettings.imageUrl;
    this.checkoutSummary();
  }

}
