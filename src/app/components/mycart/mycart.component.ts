import { AppSettings } from './../../config';
import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
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
  items
  constructor(public loginService: DataService, ) {
  }

  orders = [];
  data = {}
  ngOnInit() {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId)
    } else {
      this.id = ''
    }
    //   this.cartCheckout();
    this.getCart();
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
      this.grandTotal = response.json().summary.grand_total;
      this.cartCount = response.json().summary.cart_count;
      this.mycart = response.json().cart;
      console.log(this.mycart);
    }, err => {
      console.log(err)
    })
  }
  itemIncrease(data, name, id, skuId, index) {
    // this.selected = index;
    let thisObj = this;
    // if (localStorage.name !== name) {
    //   thisObj.items.quantity = 0;
    // }
    if (name === data.name) {
      // thisObj.showInput = true;
      // thisObj.items.quantity = Math.floor(this.mycart + 1);
      // thisObj.getCart(thisObj.items.quantity, id, skuId);
      localStorage.setItem('name', name);
    }
  }

  itemDecrease(id, skuId, index) {
    // this.selected = index;
    let thisObj = this;
    // if (thisObj.items.quantity === 1) {
    //   return;
    // }
    // thisObj.items.quantity = Math.floor(thisObj.items.quantity - 1);
    // this.getCart(thisObj.items.quantity, id, skuId);
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
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      id_product: product,
      id_sku: sku
    }
    this.loginService.removeCart(inData).subscribe(response => {
      swal("item removed successfully", '', 'success');
      this.getCart();
    })
  }
}
