import { Router } from '@angular/router';
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
  Promo:string;
  cartSummary:string;
  orderId:string;
  orders=[];
  data={}
  cart:string;
  checkout:string;
  userName:string;
  id:string;
  timeSlot:string;
  dateSlot:string;
  url;
  constructor(public loginService: DataService, public router:Router) { 
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
  postPromo(){
    var inData = {
        _session: localStorage.session,
        coupon_code:"yesspree30",
        id_order:JSON.stringify(this.orderId)
      }
      this.loginService.postPromo(inData).subscribe(response => {
        this.Promo = response.json().result;
        console.log(this.Promo);
      }, err => {
        swal(err.message, "", "error")
      })
  }
  checkoutSummary(){
    var inData = {
        _session: localStorage.session,
        parent_warehouseid: JSON.parse(localStorage.parent_warehouseid),
        id_warehouse: JSON.parse(localStorage.id_warehouse),
        lang:"en",
      }
      this.loginService.checkoutSummary(inData).subscribe(response => {
        this.cartSummary = response.json().orders;
        this.cart = response.json().cart;
        this.orderId = response.json().orders[0].order_id;
        this.dateSlot = response.json().orders[0].deliveryslot;
        this.timeSlot = response.json().orders[0].deliveryslot[0].times;
        console.log(this.orderId);
      }, err => {
        swal(err.message, "", "error")
      })
  }
  cartCheckout(){   
    this.data={
      "id_order":JSON.stringify(this.orderId),
      "total_paid":"46",
      "pay_type":"cod",
      "pay_option":"COD",
      "express":1
    }
    this.orders.push(this.data);
    console.log(this.orders);
  var inData = {
      _id: this.id,
      parent_warehouseid: JSON.parse(localStorage.parent_warehouseid),
      id_warehouse: JSON.parse(localStorage.id_warehouse),
      lang:"en",
      orders:this.orders     
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
