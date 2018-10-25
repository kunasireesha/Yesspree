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
      pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode,
      "lang": "en",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "id_warehouse": localStorage.id_warehouse,

    }
    this.loginService.getSubcat(inData).subscribe(response => {
      this.childCat = response.json().result.category;
    }, err => {
      console.log(err.message, "", "error");
    })
  }


  dashboardData;
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
    console.log(localStorage.wh_pincode);
    console.log(localStorage.pincode)

    this.getChildCat();
    this.url = AppSettings.imageUrl;
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
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
      pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.dashboardData = response.json().result;
      // this.categoryData = response.json().result.category;
      this.brandsData = response.json().result.brands;
      if (response.json().result.banner[1].bannerdata.length !== '' || response.json().result.banner[1].bannerdata.length !== undefined || response.json().result.banner[1].bannerdata.length !== 0) {
        this.sqareBaneer1 = response.json().result.banner[1].bannerdata[0] || '';
        this.sqareBaneer2 = response.json().result.banner[1].bannerdata[1] || '';
      }
      if (response.json().result.banner[2].bannerdata.length !== '' || response.json().result.banner[2].bannerdata.length !== undefined || response.json().result.banner[2].bannerdata.length !== 0) {
        this.BigSqur = response.json().result.banner[2].bannerdata;
      }


      this.popProducts = response.json().result.banner[3].bannerdata;

      if (response.json().result.banner[6].bannerdata.length !== '' || response.json().result.banner[6].bannerdata.length !== undefined || response.json().result.banner[6].bannerdata.length !== 0) {
        this.squrBanner = response.json().result.banner[6].bannerdata;
      }

      if (response.json().result.banner[7].bannerdata.length !== '' || response.json().result.banner[7].bannerdata.length !== undefined || response.json().result.banner[7].bannerdata.length !== 0) {
        this.offerBanner1 = response.json().result.banner[7].bannerdata[0] || '';
        this.offerBanner2 = response.json().result.banner[7].bannerdata[1] || '';
        this.offerBanner3 = response.json().result.banner[7].bannerdata[2] || '';
      }

      if (response.json().result.specific_product !== undefined) {
        if (response.json().result.specific_product[0] !== undefined) {
          if (response.json().result.specific_product[0].product.length !== '' || response.json().result.specific_product[0].product.length !== undefined || response.json().result.specific_product[0].product.length !== 0) {
            this.products = response.json().result.specific_product[0].product;
            this.slidingbanner = response.json().result.banner[5].bannerdata;
            for (var i = 0; i < this.products.length; i++) {
              this.productImage = this.products[i].pic[0].pic;
            }
          }
        }

        if (response.json().result.specific_product[1] !== undefined) {
          if (response.json().result.specific_product[1].product.length !== '' || response.json().result.specific_product[1].product.length !== undefined || response.json().result.specific_product[1].product.length !== 0) {
            this.products1 = response.json().result.specific_product[1].product;
          }
        }
      }
    }, err => {
      console.log(err)
    });


    this.getTopProducts();
    this.getAllProducts();
  }


  showSubData(data) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: data._id,
        name: data.name

      }
    }

    this.router.navigate(["/products"], navigationExtras);
  }


  //add to cart


  itemIncrease(data, size, name, id, skuId, index) {
    this.selected = index;
    let thisObj = this;
    if (localStorage.size !== size || localStorage.name !== name) {
      thisObj.items.quantity = 0;
    }
    if (name === data.productName) {
      thisObj.showInput = true;
      thisObj.items.quantity = Math.floor(thisObj.items.quantity + 1);
      thisObj.getCart(thisObj.items.quantity, id, skuId);
      localStorage.setItem('size', size);
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
      wh_pincode: localStorage.wh_pincode,
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: JSON.parse(localStorage.id_warehouse, )
    }
    this.loginService.getCart(inData).subscribe(response => {
      swal('Item added to cart', '', 'success');
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }

  skudata = [];
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
        for (var j = 0; j < this.topProductsdata[i].sku.length; j++) {
          if (this.topProductsdata[i].sku[j].mrp !== undefined) {
            this.percentage = 100 - (this.topProductsdata[i].sku[j].selling_price / this.topProductsdata[i].sku[j].mrp) * 100
            this.topProductsdata[i].sku[j].percentage = Math.round(this.percentage);
            this.topProductsdata[i].sku[j].productName = this.topProductsdata[i].name;
          }
          this.topProductsdata[i].sku[j].image = this.url + this.topProductsdata[i].pic[0].pic;
          this.skudata.push(this.topProductsdata[i].sku[j]);
        }
      }
    }, error => {
    })
  }

  allskudata = [];
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
        for (var j = 0; j < this.allProductsdata[i].sku.length; j++) {
          if (this.allProductsdata[i].sku[j].mrp !== undefined) {
            this.percentage = 100 - (this.allProductsdata[i].sku[j].selling_price / this.allProductsdata[i].sku[j].mrp) * 100
            this.allProductsdata[i].sku[j].percentage = Math.round(this.percentage);
            this.allProductsdata[i].sku[j].productName = this.allProductsdata[i].name;
          }
          this.allProductsdata[i].sku[j].image = this.url + this.allProductsdata[i].pic[0].pic;
          this.allskudata.push(this.allProductsdata[i].sku[j]);
        }
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
  showProductDetails(prod) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        proId: prod.id_product
      }
    }
    this.router.navigate(["/product_details"], navigationExtras);
  }

}
