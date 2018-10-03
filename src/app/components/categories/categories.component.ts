import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, Params } from '@angular/router';
import { AppSettings } from '../../config';
import { DataService } from '../../services/login/login';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {

  constructor(private route: ActivatedRoute, public router: Router, public loginService: DataService) {
    this.route.queryParams.subscribe(params => {
      this.catId = params.id;
      this.catName = params.name;
      this.getChildCat();
    });

  }

  catId;
  catName;
  url;
  childCat = [];

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
  pageNav;
  showInput = false;
  items = {
    quantity: 1
  }


  productImage;
  slidingbanner = [];

  ngOnInit() {

    this.getChildCat();
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


  getTopProducts(action) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        action: action,
        catId: this.catId
      }

    }
    this.router.navigate(["/recProducts"], navigationExtras);

  }





}
