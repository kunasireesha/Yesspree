import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';

@Component({
  selector: 'app-rec-products',
  templateUrl: './rec-products.component.html',
  styleUrls: ['./rec-products.component.css', '../product/product.component.less', '../home/home.component.less']

})
export class RecProductsComponent implements OnInit {
  type;
  id;
  products = []
  brands = []
  showbrands = false;
  showproducts = false;
  noData = false;
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.type = params.action;
      this.catId = params.catId
    })
  }
  typeOfProduct;
  catId;
  subCatId;
  title;
  url;
  percentage;
  showInput = true;
  items = {
    quantity: 1
  }
  selected;
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
      this.showbrands = false;
    } else if (this.type === 'recProducts1') {
      this.typeOfProduct = "specific_product2";
      this.subCatId = '';
      this.title = "Recommended Products";
      this.showbrands = false;
    } else if (this.type === 'topProducts') {
      this.typeOfProduct = "top_products";
      this.subCatId = this.catId;
      this.title = "Top Products";
      this.showbrands = false;
    } else if (this.type === 'allProducts') {
      this.typeOfProduct = "all_products";
      this.subCatId = this.catId;
      this.title = "All Products";
      this.showbrands = false;
    } else if (this.type === 'brands') {
      this.typeOfProduct = "brands";
      this.title = "All Brands";
      this.subCatId = '';
      this.showbrands = true;
    }


    var inData = {
      "_id": this.id,
      "_session": localStorage.session,
      "count": 20,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "start": 0,
      "type": this.typeOfProduct,
      "id_subcategory": this.subCatId
    }
    this.loginService.recProducts(inData).subscribe(response => {
      this.products = response.json().product;
      this.brands = response.json().brands;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - (this.products[i].sku[0].selling_price / this.products[i].sku[0].mrp) * 100
          this.products[i].sku[0].percentage = this.percentage;
        }
        this.products[i].image = this.url + this.products[i].pic[0].pic;
      }


    }, error => {

    })
  }

  //add to cart
  quantity;
  getCart(quantity, id, skuId) {
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
      wh_pincode: "560078",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: JSON.parse(localStorage.id_warehouse, )
    }
    this.loginService.getCart(inData).subscribe(response => {
      swal('Item added to cart', '', 'success');
      this.items.quantity = this.quantity;
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }

  itemIncrease(data, name, id, skuId, index) {
    this.selected = index;
    let thisObj = this;
    if (localStorage.name !== name) {
      thisObj.items.quantity = 0;
    }
    if (name === data.name) {
      thisObj.showInput = true;
      thisObj.items.quantity = Math.floor(thisObj.items.quantity + 1);
      thisObj.getCart(thisObj.items.quantity, id, skuId);
      localStorage.setItem('name', name);
    }
  }

  itemDecrease(id, skuId, index) {
    this.selected = index;
    let thisObj = this;
    if (thisObj.items.quantity === 1) {
      return;
    }
    thisObj.items.quantity = Math.floor(thisObj.items.quantity - 1);
    this.getCart(thisObj.items.quantity, id, skuId);
  }


}
