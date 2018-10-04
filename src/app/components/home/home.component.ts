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

  }

  dashboardData;
  skuid: string;
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
  wishList;
  showInput = true;
  childCat = [];
  items = {
    quantity: 1
  }
  selected;
  quantity;

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
  subSubCatData
  slidingbanner = [];
  percentage;
  percentage1;

  ngOnInit() {
    this.url = AppSettings.imageUrl;
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId)
    } else {
      this.id = 0
    }
    var inData = {
      _id: this.id,
      device_type: "desktop",
      _session: "115313153802191_NAM",
      lang: "en",
      parent_warehouseid: JSON.parse(localStorage.parent_warehouseid),
      id_warehouse: JSON.parse(localStorage.id_warehouse),
      pincode: "560075"
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.dashboardData = response.json().result;
      this.skuid = response.json().result.specific_product[0].product[0].sku[0]._id;
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
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - (this.products[i].sku[0].selling_price / this.products[i].sku[0].mrp) * 100
          this.products[i].sku[0].percentage = this.percentage;
        }
      }

      this.slidingbanner = response.json().result.banner[5].bannerdata;
      //for product image
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].image = this.url + this.products[i].pic[0].pic;
      }

      this.products1 = response.json().result.specific_product[1].product;
      for (var i = 0; i < this.products1.length; i++) {
        if (this.products1[i].sku[0].mrp !== undefined) {
          this.percentage1 = this.products1[i].sku[0].selling_price / this.products1[i].sku[0].mrp * 100
          this.products1[i].sku[0].percentage = this.percentage1;
        }
      }
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
  viewProducts(action) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        action: action
      }

    }
    this.router.navigate(["/recProducts"], navigationExtras);
  }

  showProductDetails(proId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        proId: proId
      }

    }
    this.router.navigate(["/product_details"], navigationExtras);
  }


}
