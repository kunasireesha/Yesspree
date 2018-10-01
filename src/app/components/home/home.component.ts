import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { AppSettings } from '../../config';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less', '../product/product.component.less']
})
export class HomeComponent implements OnInit {

  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router) {
    this.pageNav = this.route.snapshot.data[0]['page'];
    this.route.queryParams.subscribe(params => {
      this.catId = params.id;
    });
    if (this.pageNav === 'childCategories') {
      this.showchildCat = true;
    }
    if (this.showchildCat) {
      this.getChildCat();
    }
  }


  dashboardData;
  // categoryData;
  sqareBaneer1;
  sqareBaneer2;
  BigSqur;
  popProducts;
  squrBanner;
  offerBanner1;
  offerBanner2;
  offerBanner3;
  products;
  products1;
  brandsData = [];
  id;
  url;
  pageNav;
  catId;
  mainBanner;
  showchildCat = false;
  showInput = false;
  childCat = [];
  items = {
    quantity: 1
  }

  getChildCat() {
    this.url = AppSettings.imageUrl;
    var inData = {
      id_category: this.catId,
      pincode: "500074",
      "lang": "en",
      "parent_warehouseid": "1",
      "id_warehouse": "2"

    }
    this.loginService.getSubcat(inData).subscribe(response => {
      this.childCat = response.json().result.category;
    }, err => {
      console.log(err.message, "", "error");
    })
  }

  productImage;
  slidingbanner = [];

  ngOnInit() {
    this.url = AppSettings.imageUrl;
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId)
    } else {
      this.id = 0
    }
    var inData = {
      _id: this.id,
      device_type: "android",
      _session: "115313153802191_NAM",
      lang: "en",
      parent_warehouseid: "1",
      id_warehouse: "2",
      pincode: "560075"
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.dashboardData = response.json().result;
      // this.categoryData = response.json().result.category;
      this.brandsData = response.json().result.brands;
      this.mainBanner = response.json().result.banner[0].bannerdata;
      this.sqareBaneer1 = response.json().result.banner[1].bannerdata[0];
      this.sqareBaneer2 = response.json().result.banner[1].bannerdata[1];
      this.BigSqur = response.json().result.banner[2].bannerdata;
      this.popProducts = response.json().result.banner[3].bannerdata;
      this.squrBanner = response.json().result.banner[6].bannerdata;
      this.offerBanner1 = response.json().result.banner[7].bannerdata[0];
      this.offerBanner2 = response.json().result.banner[7].bannerdata[1];
      this.offerBanner3 = response.json().result.banner[7].bannerdata[2];
      this.products = response.json().result.specific_product[0].product;
      this.slidingbanner = response.json().result.banner[5].bannerdata;
      console.log(this.products);
      for (var i = 0; i < this.products.length; i++) {
        this.productImage = this.products[i].pic[0].pic;
      }
      this.products1 = response.json().result.specific_product[1].product;
    }, err => {
      console.log(err)
    })
  }


  showSubData(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    }

    this.router.navigate(["/products"], navigationExtras);
  }


  //add to cart
  itemIncrease() {
    let thisObj = this;
    this.showInput = true;
    thisObj.items.quantity = Math.floor(thisObj.items.quantity + 1);
    this.getCart(thisObj.items.quantity);
  }
  itemDecrease() {
    let thisObj = this;
    if (thisObj.items.quantity === 1) {
      return;
    }
    thisObj.items.quantity = Math.floor(thisObj.items.quantity - 1);
    this.getCart(thisObj.items.quantity);
  }
  getCart(quantity) {
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      id_product: "11",
      id_sku: "20",
      op: "modify",
      quantity: quantity,
      wh_pincode: "560078",
    }
    this.loginService.getCart(inData).subscribe(response => {
      //   this.subSubCatData = response.json().result.sub_category;
    }, err => {
      console.log(err)
    })
  }
  wish(id){
    var inData = {
      _session:localStorage.session,
      _id:this.id,
      id_product:5,
      op:"create",
      "parent_warehouseid":"",
      "id_warehouse":"",
      "lang":"en"
    }
    this.loginService.wish(inData).subscribe(response=> {
    console.log(response);
    },err=>{

    })
  }


}
