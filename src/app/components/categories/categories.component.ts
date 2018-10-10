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
      this.getTopProducts();
      this.getAllProducts();
    });

  }

  catId;
  catName;
  url;
  childCat = [];
  wishList = [];
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
  topProductsdata = [];
  allProductsdata = [];
  id;
  pageNav;
  showInput = true;
  items = {
    quantity: 1
  }
  percentage;
  selected;

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
      device_type: "desktop",
      _session: localStorage.session,
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
    });

    this.getTopProducts();
    this.getAllProducts();
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
    if (localStorage.catname !== name) {
      thisObj.items.quantity = 0;
    }
    if (name === data.name) {
      thisObj.showInput = true;
      thisObj.items.quantity = Math.floor(thisObj.items.quantity + 1);
      thisObj.getCart(thisObj.items.quantity, id, skuId);
      localStorage.setItem('catname', name);
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
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }


  //get dashbrd top products
  getTopProducts() {
    var inData = {
      "_id": this.id,
      "_session": localStorage.session,
      "count": 4,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "start": 0,
      "type": 'top_products',
      "id_subcategory": this.catId
    }
    this.loginService.recProducts(inData).subscribe(response => {
      this.topProductsdata = response.json().product;
      for (var i = 0; i < this.topProductsdata.length; i++) {
        if (this.topProductsdata[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - (this.topProductsdata[i].sku[0].selling_price / this.topProductsdata[i].sku[0].mrp) * 100
          this.topProductsdata[i].sku[0].percentage = this.percentage;
        }
        this.topProductsdata[i].image = this.url + this.topProductsdata[i].pic[0].pic;
      }
    }, error => {

    })
  }

  getAllProducts() {
    var inData = {
      "_id": this.id,
      "_session": localStorage.session,
      "count": 4,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "start": 0,
      "type": 'all_products',
      "id_subcategory": this.catId
    }
    this.loginService.recProducts(inData).subscribe(response => {
      this.allProductsdata = response.json().product;
      for (var i = 0; i < this.allProductsdata.length; i++) {
        if (this.allProductsdata[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - (this.allProductsdata[i].sku[0].selling_price / this.allProductsdata[i].sku[0].mrp) * 100
          this.allProductsdata[i].sku[0].percentage = this.percentage;
        }
        this.allProductsdata[i].image = this.url + this.allProductsdata[i].pic[0].pic;
      }
    }, error => {

    })
  }

  getViewAllProducts(action) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        action: action,
        catId: this.catId
      }
    }
    this.router.navigate(["/recProducts"], navigationExtras);

  }
  wish(id) {
    var inData = {
      _session: localStorage.session,
      _id: this.id,
      id_product: id,
      op: "create",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "id_warehouse": localStorage.id_warehouse,
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
  showProductDetails(proId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        proId: proId
      }
    }
    this.router.navigate(["/product_details"], navigationExtras);
  }

}
