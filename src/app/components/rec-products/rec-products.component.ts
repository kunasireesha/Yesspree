

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';

@Component({
  selector: 'app-rec-products',
  templateUrl: './rec-products.component.html',
  styleUrls: ['./rec-products.component.css', '../products/products.component.less','../home/home.component.less']
})
export class RecProductsComponent implements OnInit {
  type;
  id;
  products=[];
  brands=[];
  url;
  showbrands = false;
  showproducts =false;
  noData=false;
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
  percentage;
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
      this.showbrands = true;
     this.showbrands = false;
    } else if (this.type === 'recProducts1') {
      this.typeOfProduct = "specific_product2";
      this.subCatId = '';
      this.title = "Recommended Products";
      this.showbrands = true;
     this.showbrands = false;
    } else if (this.type === 'topProducts') {
      this.typeOfProduct = "top_products";
      this.subCatId = this.catId;
      this.title = "Top Products";
      this.showbrands = true;
     this.showbrands = false;
    } else if (this.type === 'allProducts') {
      this.typeOfProduct = "all_products";
      this.subCatId = this.catId;
      this.title = "All Products";
      this.showbrands = true;
     this.showbrands = false;
    } else if (this.type === 'brands') {
      this.typeOfProduct = "brands";
      this.noData = false;
      this.showbrands = true;
      this.title = "All Brands";
      this.subCatId = '';
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
      this.brands = response.json().brands;
      console.log(response.json().brands);
   if(this.products!==undefined){
     this.showbrands=false;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].sku[0].actual_price !== undefined) {
          this.percentage = this.products[i].sku[0].selling_price / this.products[i].sku[0].actual_price * 100
          this.products[i].sku[0].percentage = this.percentage;
        }
      }
    }
    }, error => {
    })
  }



}
