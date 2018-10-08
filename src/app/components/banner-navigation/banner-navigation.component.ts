import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';


@Component({
  selector: 'app-banner-navigation',
  templateUrl: './banner-navigation.component.html',
  styleUrls: ['./banner-navigation.component.css','../product/product.component.less']
})
export class BannerNavigationComponent implements OnInit {
  type;
  target;
  url;
  id;
  brandData = [];
  percentage;
  showInput = true;
  wishList = [];
  selected;
  items = {
    quantity: 1
  }
  quantity;
  subSubCatData;
  constructor(public loginService:DataService, private route: ActivatedRoute, public router: Router ) {
    this.route.queryParams.subscribe(params=> {
      this.type =params.type
      this.target = params.target
    })
   }

  ngOnInit() {
    this.url = AppSettings.imageUrl;
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = 0;
    }
    if(this.type === 'brand'){
       var inData = {
        "_id":this.id,
        "_session":localStorage.session,
        "brand":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse":JSON.parse(localStorage.id_warehouse),
        "lang":"en"
      }
      this.loginService.brands(inData).subscribe(response=> {
        this.brandData = response.json().product;
        for(var i = 0; i<this.brandData.length; i++) {
          if (this.brandData[i].sku[0].mrp !== undefined) {
            this.percentage = 100 - (this.brandData[i].sku[0].selling_price / this.brandData[i].sku[0].mrp) * 100
            this.brandData[i].sku[0].percentage = this.percentage;
          }
        this.brandData[i].image = this.url + this.brandData[i].pic[0].pic;
        }
        // console.log(this.brandData)
      },error=>{

      })
    } else if(this.type === 'search'){
      var params2 = {
        "_id":this.id,
        "_session":localStorage.session,
        "search":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse":JSON.parse(localStorage.id_warehouse),
        "lang":"en"
      }
      this.loginService.searchAll(params2).subscribe(response=> {
        this.brandData = response.json().product;
        for(var i = 0; i<this.brandData.length; i++) {
          if (this.brandData[i].sku[0].mrp !== undefined) {
            this.percentage = 100 - (this.brandData[i].sku[0].selling_price / this.brandData[i].sku[0].mrp) * 100
            this.brandData[i].sku[0].percentage = this.percentage;
          }
          this.brandData[i].image = this.url + this.brandData[i].pic[0].pic;
          }
      },error=> {

      })
    }
    else if(this.type === 'category') {
      var params1 = {
        "_id":this.id,
        "_session":localStorage.session,
        "category":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse":JSON.parse(localStorage.id_warehouse),
        "lang":"en"
      }
      this.loginService.category(params1).subscribe(response=> {
        this.brandData = response.json().product;
        for(var i = 0; i<this.brandData.length; i++) {
          if (this.brandData[i].sku[0].mrp !== undefined) {
            this.percentage = 100 - (this.brandData[i].sku[0].selling_price / this.brandData[i].sku[0].mrp) * 100
            this.brandData[i].sku[0].percentage = this.percentage;
          }
          this.brandData[i].image = this.url + this.brandData[i].pic[0].pic;
          }
        },error=> {
    
        })
    } else {
      var params = {
        "_id":this.id,
        "_session":localStorage.session,
        "sku":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse":JSON.parse(localStorage.id_warehouse),
        "lang":"en"
      }
      this.loginService.skuInfo(params).subscribe(response=> {
        this.brandData = response.json().product;
        for(var i = 0; i<this.brandData.length; i++) {
          if (this.brandData[i].sku[0].mrp !== undefined) {
            this.percentage = 100 - (this.brandData[i].sku[0].selling_price / this.brandData[i].sku[0].mrp) * 100
            this.brandData[i].sku[0].percentage = this.percentage;
          }
          this.brandData[i].image = this.url + this.brandData[i].pic[0].pic;
          }
      },error=> {
        
      })
    }
  }
  //add to cart
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
      parent_warehouseid: JSON.parse(localStorage.parent_warehouseid),
      id_warehouse: JSON.parse(localStorage.id_warehouse)
    }
    this.loginService.getCart(inData).subscribe(response => {
      this.subSubCatData = response.json();
      swal('Item added to cart', '', 'success');
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }

  wish(id) {
    var inData = {
      _session: localStorage.session,
      _id: this.id,
      id_product: id,
      op: "create",
      "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
      "id_warehouse": JSON.parse(localStorage.id_warehouse),
      "lang": "en"

    }
    this.loginService.wish(inData).subscribe(response => {
      if (response.json().status === "failure") {
        swal("Wishlist already added. Please try again.", "", "error")
      } else {
        this.wishList = response.json();
        swal("Added to wish list", "", "success")
      }

    }, err => {
      console.log(err)
    })
  }
}
