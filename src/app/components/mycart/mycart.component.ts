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
      parent_warehouseid: JSON.parse(localStorage.parent_warehouseid),
      id_warehouse: JSON.parse(localStorage.id_warehouse),
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
