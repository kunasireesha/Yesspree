import { AppSettings } from './../../config';
import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { HeadercartComponent } from '../../components/headercart/headercart.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css', '../../components/header/header.component.less'],
  providers: [HeadercartComponent]
})
export class MycartComponent implements OnInit {
  userName: string;
  id: string;
  checkout: string;
  mrp: string;
  grandTotal: string;
  mycart: string;
  cartCount: string;
  url: string;
  exploreCart: string;
  removeCrt: string;
  items;
  selected;
  sku = {
    mycart: 0
  }
  summary
  quantity
  constructor(public loginService: DataService, public router: Router, public header: HeadercartComponent) {
  }

  orders = [];
  data = {}
  ngOnInit() {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId)
    } else {
      this.id = '0'
    }
    //   this.cartCheckout();
    this.getCart();
    this.header.geoLocation();
    this.header.postVillageName(localStorage.wh_pincode);
    this.getDashboard();
  }
  getCart() {
    this.url = AppSettings.imageUrl;
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      op: "get",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      lang: "en"
    }
    this.loginService.getCart(inData).subscribe(response => {
      this.mrp = response.json().summary.mrp;
      // this.grandTotal = response.json().summary.grand_total;
      // this.cartCount = response.json().summary.cart_count;
      this.mycart = response.json().cart;
      this.summary = response.json().summary;
      console.log(this.mycart);
    }, err => {
      console.log(err)
    })
  }
  itemIncrease(data, name, id, skuId, index) {
    console.log(data);
    this.selected = index;
    let thisObj = this;
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        this.sku.mycart = parseInt(data[i].sku[0].mycart);
      }
    }
    this.sku.mycart = Math.floor(this.sku.mycart + 1);
    thisObj.addCart(this.sku.mycart, id, skuId);
    localStorage.setItem('cartName', name);
    this.getCart();
    this.getDashboard();
  }

  itemDecrease(data, name, id, skuId, index) {
    this.selected = index;
    let thisObj = this;

    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        this.sku.mycart = parseInt(data[i].sku[0].mycart);
      }
    }
    if (this.sku.mycart === 1) {
      return;
    }
    this.sku.mycart = Math.floor(this.sku.mycart - 1);
    this.addCart(this.sku.mycart, id, skuId);
  }
  addCart(quantity, id, skuId) {
    if (quantity === 0) {
      this.quantity = 1;
    } else {
      this.quantity = quantity
    }
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      id_product: id,
      id_sku: skuId,
      op: "modify",
      quantity: JSON.stringify(this.quantity),
      wh_pincode: localStorage.wh_pincode,
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: JSON.parse(localStorage.id_warehouse)
    }
    this.loginService.getCart(inData).subscribe(response => {
      this.cartCount = response.json().summary.cart_count;
      this.grandTotal = response.json().summary.grand_total;
      swal("Item added to cart", "", "success")
      //   swal("Item added to cart", "", "success", {
      //     buttons: ["", "Okay"],
      // }).then((value) => {
      //     if (value === true) {
      //         window.location.reload();
      //     }
      // });

      this.getCart();

    }, err => {
      swal(err.json().message, '', 'error');
    })
  }

  exploreCartCount() {
    var inData = {
      _id: this.id
    }
    this.loginService.exploreCartCount(inData).subscribe(response => {
      this.exploreCart = response.json();
      swal("Explore successfully", '', 'success');
    })
  }
  removeCart(product, sku) {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId)
    } else {
      this.id = '0'
    }
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      id_product: product,
      id_sku: sku
    }
    this.loginService.removeCart(inData).subscribe(response => {
      swal("item removed successfully", "", "success")
      // swal("item removed successfully", '', 'success', {
      //   buttons: ["", "Okay"],
      // }).then((value) => {
      //   if (value === true) {
      //     window.location.reload();
      //   }
      // });

      this.getCart();
      this.getDashboard();
    })
  }
  checkoutCart() {
    if (this.id === '0') {
      swal("Login and try again", "", "error");
    } else {
      this.router.navigate(["/orderSummary"]);
    }
  }

  //header

  categoryData = [];
  getHeadCart() {
    this.header.getCart();
  }

  itemHeaderIncrease(cart, name, id, skuid, index) {
    this.header.itemIncrease(cart, name, id, skuid, index);
    this.getDashboard();
  }

  itemHeaderDecrease(cart, name, id, skuid, index) {
    this.header.itemDecrease(cart, name, id, skuid, index);
    this.getDashboard();
  }
  headerSubscribe(id, name) {
    this.header.subscribe(id, name);
  }

  getDashboard() {
    var inData = {
      _id: this.id,
      device_type: "web",
      _session: localStorage.session,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.cartCount = response.json().summary.cart_count;
      this.grandTotal = response.json().summary.grand_total;
      this.categoryData = response.json().result.category;

    }, err => {
      console.log(err)
    });
  }

}
