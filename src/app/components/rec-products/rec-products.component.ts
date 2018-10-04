import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';

@Component({
  selector: 'app-rec-products',
  templateUrl: './rec-products.component.html',
  styleUrls: ['./rec-products.component.css', '../products/products.component.less']
})
export class RecProductsComponent implements OnInit {
  type;
  id;
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.type = params.action;
      this.catId = params.catId
    })
  }
  typeOfProduct;
  catId;
  subCatId;
  products = [];
  title;
  url;
  percentage;
  showInput = false;
  items = {
    quantity: 0
  }
  ngOnInit() {
    this.url = AppSettings.imageUrl;
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {

      this.id = 0;
    }
    if (this.type === 'recProducts') {
      this.typeOfProduct = "specific_product1";
      this.subCatId = '';
      this.title = "Recommended Products";
    } else if (this.type === 'recProducts1') {
      this.typeOfProduct = "specific_product2";
      this.subCatId = '';
      this.title = "Recommended Products";
    } else if (this.type === 'topProducts') {
      this.typeOfProduct = "top_products";
      this.subCatId = this.catId;
      this.title = "Top Products";
    } else if (this.type === 'allProducts') {
      this.typeOfProduct = "all_products";
      this.subCatId = this.catId;
      this.title = "All Products";
    } else {
      this.typeOfProduct = "brands"
    }


    var inData = {
      "_id": this.id,
      "_session": localStorage.session,
      "count": 20,
      "id_warehouse": JSON.parse(localStorage.id_warehouse),
      "lang": "en",
      "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
      "start": 0,
      "type": this.typeOfProduct,
      "id_subcategory": this.subCatId
    }
    this.loginService.recProducts(inData).subscribe(response => {
      this.products = response.json().product;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].sku[0].actual_price !== undefined) {
          this.percentage = this.products[i].sku[0].selling_price / this.products[i].sku[0].actual_price * 100
          this.products[i].sku[0].percentage = this.percentage;
        }
        this.products[i].image = this.url + this.products[i].pic[0].pic;
      }


    }, error => {

    })
  }

  //add to cart
  itemIncrease(id, skuId) {
    let thisObj = this;
    this.showInput = true;
    thisObj.items.quantity = Math.floor(thisObj.items.quantity + 1);
    this.getCart(thisObj.items.quantity, id, skuId);
  }
  itemDecrease(id, skuId) {
    let thisObj = this;
    if (thisObj.items.quantity === 1) {
      return;
    }
    thisObj.items.quantity = Math.floor(thisObj.items.quantity - 1);
    this.getCart(thisObj.items.quantity, id, skuId);
  }
  getCart(quantity, id, skuId) {
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      id_product: id,
      id_sku: skuId,
      op: "modify",
      quantity: JSON.stringify(quantity),
      wh_pincode: "560078",
      parent_warehouseid: JSON.parse(localStorage.parent_warehouseid),
      id_warehouse: JSON.parse(localStorage.id_warehouse)
    }
    this.loginService.getCart(inData).subscribe(response => {
      swal('Item added to cart', '', 'success');
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }


}
