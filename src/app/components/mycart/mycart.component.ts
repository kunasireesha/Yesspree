import { AppSettings } from './../../config';
import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

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
  items;
  selected;
  sku = {
    mycart: 0
  }
  summary
  quantity
  constructor(public loginService: DataService, public router: Router, ) {
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
  }

  itemDecrease(data, id, skuId, index, mycart) {
    this.selected = index;
    let thisObj = this;
    // if (this.sku.mycart === 1) {
    //   return;
    // }
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        this.sku.mycart = parseInt(data[i].sku[0].mycart);
      }
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
      id_warehouse: JSON.parse(localStorage.id_warehouse, )
    }
    this.loginService.getCart(inData).subscribe(response => {
      swal("Item added to cart", "", "success", {
        buttons: ["", "Okay"],
      }).then((value) => {
        if (value === true) {
          window.location.reload();
        }
      });
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
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      id_product: product,
      id_sku: sku
    }
    this.loginService.removeCart(inData).subscribe(response => {
      swal("item removed successfully", '', 'success', {
        buttons: ["", "Okay"],
      }).then((value) => {
        if (value === true) {
          window.location.reload();
        }
      });

      this.getCart();
    })
  }
  checkoutCart() {
    if (this.id == '') {
      swal("Login and try again", "", "error");
    } else {
      this.router.navigate(["/orderSummary"]);
    }
  }
}
