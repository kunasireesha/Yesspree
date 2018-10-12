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
  Village = [];
  dashboardData;
  skuid: string;
  showProducts1: boolean;
  showProducts: boolean;
  // categoryData;

  sqareBaneer1 = {
    pic: ''
  };
  sqareBaneer2 = {
    pic: ''
  };
  BigSqur;
  popProducts;
  squrBanner;
  offerBanner1 = {
    pic: ''
  };
  offerBanner2 = {
    pic: ''
  };
  offerBanner3 = {
    pic: ''
  };
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
  squarebanner = false;
  squarebanner1 = false;

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
  randomkey;

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
      _session: localStorage.session,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      pincode: "560075"
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.dashboardData = response.json().result;
      // this.skuid = response.json().result.specific_product[0].product[0].sku[0]._id;
      // this.categoryData = response.json().result.category;
      this.brandsData = response.json().result.brands;
      if (response.json().result.banner[0].bannerdata.length !== '' || response.json().result.banner[0].bannerdata.length !== undefined || response.json().result.banner[0].bannerdata.length !== 0) {
        this.mainBanner = response.json().result.banner[0].bannerdata;
      }

      if (response.json().result.banner[1].bannerdata.length !== '' || response.json().result.banner[1].bannerdata.length !== undefined || response.json().result.banner[1].bannerdata.length !== 0) {
        this.sqareBaneer1 = response.json().result.banner[1].bannerdata[0] || '';
        this.sqareBaneer2 = response.json().result.banner[1].bannerdata[1] || '';
      }

      if (response.json().result.banner[2].bannerdata.length !== '' || response.json().result.banner[2].bannerdata.length !== undefined || response.json().result.banner[2].bannerdata.length !== 0) {
        this.BigSqur = response.json().result.banner[2].bannerdata;
      }

      this.popProducts = response.json().result.banner[3].bannerdata;
      // }
      // 
      if (response.json().result.banner[6].bannerdata.length !== '' || response.json().result.banner[6].bannerdata.length !== undefined || response.json().result.banner[6].bannerdata.length !== 0) {
        this.squrBanner = response.json().result.banner[6].bannerdata;
      }
      if (response.json().result.banner[7].bannerdata.length !== '' || response.json().result.banner[7].bannerdata.length !== undefined || response.json().result.banner[7].bannerdata.length !== 0) {
        this.offerBanner1 = response.json().result.banner[7].bannerdata[0] || '';
        this.offerBanner2 = response.json().result.banner[7].bannerdata[1]  || '';
        this.offerBanner3 = response.json().result.banner[7].bannerdata[2] || '';
      }

      //recommended products 
      // if (response.json().result.specific_product[0] !== undefined) {
      //   if (response.json().result.specific_product[0].product.length !== '' || response.json().result.specific_product[0].product.length !== undefined || response.json().result.specific_product[0].product.length !== 0) {
      //     this.products = response.json().result.specific_product[0].product;
      //     for (var i = 0; i < this.products.length; i++) {
      //       if (this.products[i].sku[0].mrp !== undefined) {
      //         this.percentage = 100 - (this.products[i].sku[0].selling_price / this.products[i].sku[0].mrp) * 100
      //         this.products[i].sku[0].percentage = this.percentage;
      //       }
      //     }
      //     this.showProducts = true;
      //   } else {
      //     this.showProducts = false;
      //   }
      // }

      if (response.json().result.banner[5].bannerdata.length !== '' || response.json().result.banner[5].bannerdata.length !== undefined || response.json().result.banner[5].bannerdata.length !== 0) {

        this.slidingbanner = response.json().result.banner[5].bannerdata;
        //for product image
        for (var i = 0; i < this.products.length; i++) {
          this.products[i].image = this.url + this.products[i].pic[0].pic;
        }
      }

      //recommended products1 
      // if (response.json().result.specific_product[1] !== undefined) {
      //   if (response.json().result.specific_product[1].product.length !== '' || response.json().result.specific_product[1].product.length !== undefined || response.json().result.specific_product[1].product.length !== 0) {
      //     this.products1 = response.json().result.specific_product[1].product;

      //     for (var i = 0; i < this.products1.length; i++) {
      //       if (this.products1[i].sku[0].mrp !== undefined) {
      //         this.percentage1 = this.products1[i].sku[0].selling_price / this.products1[i].sku[0].mrp * 100
      //         this.products1[i].sku[0].percentage = this.percentage1;
      //       }
      //     }

      //     for (var i = 0; i < this.products1.length; i++) {
      //       this.products1[i].image = this.url + this.products1[i].pic[0].pic;
      //     }
      //     this.showProducts1 = true;
      //   } else {
      //     this.showProducts1 = false;
      //   }
      // }
    }, err => {
      console.log(err)
    })

    this.viewSpecificProducts2();
    this.viewSpecificProducts1();
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
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: JSON.parse(localStorage.id_warehouse, )
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


  viewSpecificProducts1() {
    var inData = {
      "_id": this.id,
      "_session": localStorage.session,
      "count": 4,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "start": 0,
      "type": 'specific_product1',
      "id_subcategory": ''
    }
    this.loginService.recProducts(inData).subscribe(response => {
      this.products = response.json().product;
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

  viewSpecificProducts2() {
    var inData = {
      "_id": this.id,
      "_session": localStorage.session,
      "count": 4,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "start": 0,
      "type": 'specific_product2',
      "id_subcategory": ''
    }
    this.loginService.recProducts(inData).subscribe(response => {
      this.products1 = response.json().product;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products1[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - (this.products1[i].sku[0].selling_price / this.products1[i].sku[0].mrp) * 100
          this.products1[i].sku[0].percentage = this.percentage;
        }
        this.products1[i].image = this.url + this.products1[i].pic[0].pic;
      }
    }, error => {

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
  //banner navigation
  bannerNav(type, target) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        type: type,
        target: target
      }

    }
    if (type == "explore") {
      var inData = {
        _id: this.id
      }
      this.loginService.explore(inData).subscribe(response => {
        console.log(response);
        swal("Explored successfully", "", "success");
      }, error => {
        console.log(error);
      })
    } else {
      this.router.navigate(["/banner_navigation"], navigationExtras);
    }

  }


}
