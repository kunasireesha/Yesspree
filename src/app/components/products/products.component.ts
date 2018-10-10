import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { AppSettings } from '../../config';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public loginService: DataService, public http: Http) {
    this.route.queryParams.subscribe(params => {
      this.subCatId = params.id;
      this.subName = params.name;
    });
  }

  ngOnInit() {
    this.filterData();
    this.url = AppSettings.imageUrl;
    //get subcat data
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId)
    } else {
      this.id = ''
    }

    var inData = {
      _id: this.id,
      id_category: this.subCatId,
      _session: localStorage.session,
      pincode: "560075",
      "parent_warehouseid": "1",
      "id_warehouse": "2",
      "lang": "en"
    }
    this.loginService.getSubcatData(inData).subscribe(response => {
      this.subcatdata = response.json().result.sub_category;

    }, err => {
      console.log(err)
    })
  }


  showCategories = false;
  showSubCategories = false;
  showInput = true;
  showInput1 = false;
  subCatId;
  id;
  subName;
  subcatdata = [];
  subSubCatData = [];
  lastCatData = [];
  products = [];
  selectedCat;
  selectedLastCat;
  percentage;
  url;
  selected;
  brands = [];
  offers = [];
  prices = [];
  wishList = [];
  items = {
    quantity: 1
  };

  brandValue = '';
  priceValue = '';
  offersValue = '';

  brandsData = '';
  priceData = '';
  offersData = '';
  brandsFilter = [];
  pricesFilter = [];
  offersFilter = [];
  sortData = [];
  idforrefine;

  //sub sub categories
  showsubSubCat(index, subId) {
    this.selectedCat = index;
    this.showCategories = true;
    var inData = {
      _id: this.id,
      id_category: subId,
      _session: localStorage.session,
      pincode: "560075",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en"
    }
    this.loginService.getSubSubCatData(inData).subscribe(response => {
      this.subSubCatData = response.json().result.sub_category;
    }, err => {
      console.log(err)
    })
  }
  closesubSubCat() {
    this.showCategories = false;
    this.showSubCategories = false;
  }
  //end sub sub categories

  //last categories
  showLastCat(index, lastId) {
    this.selectedLastCat = index;
    this.showSubCategories = true;
    var inData = {
      _id: this.id,
      id_category: lastId,
      _session: localStorage.session,
      pincode: "560075",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en"
    }
    this.loginService.getLastCatData(inData).subscribe(response => {
      this.lastCatData = response.json().result.category;
    }, err => {
      console.log(err)
    })
  }
  closeLastCat() {
    this.showSubCategories = false;
  }
  //end last categories


  showCateProd(id) {
    this.getProducts(id);
  }
  getSubcatProd(id) {
    this.getProducts(id);
  }

  getLastProd(id) {
    this.getProducts(id);
  }

  //get products
  getProducts(id) {
    this.idforrefine = localStorage.setItem('subid', id);
    var inData = {
      _id: this.id,
      id_subcategory: id,
      _session: localStorage.session,
      wh_pincode: "560078",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "id_warehouse": localStorage.id_warehouse,
      lang: "en",
    }
    this.loginService.getProducts(inData).subscribe(response => {
      this.products = response.json().product;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - (this.products[i].sku[0].selling_price / this.products[i].sku[0].mrp) * 100
          this.products[i].sku[0].percentage = this.percentage;
        }
        this.products[i].image = this.url + this.products[i].pic[0].pic;
      }
    }, err => {
      console.log(err)
    })
  }

  showInputValue() {
    this.showInput = true;
  }

  showInputValue1() {
    this.showInput1 = true;
  }

  showProductDetails(proId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        proId: proId
      }
    }
    this.router.navigate(["/product_details"], navigationExtras);
  }


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



  //filter ata

  clearData() {
    this.brandValue = '';
    this.priceValue = '';
    this.offersValue = '';
  }

  filterData() {
    var inData = {
      "_id": this.id,
      "_session": localStorage.session,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "id_category": this.subCatId,
    }
    this.loginService.filterData(inData).subscribe(response => {
      this.sortData = response.json().sort;
      //brands
      this.brandsFilter = _.filter(response.json().refine, function (obj) {
        return obj.name === 'Brand';
      });
      this.brands = this.brandsFilter[0].Brand;

      //offers
      this.offersFilter = _.filter(response.json().refine, function (obj) {
        return obj.name === 'Offer';
      });
      this.offers = this.offersFilter[0].Offer;

      //prices
      this.pricesFilter = _.filter(response.json().refine, function (obj) {
        return obj.name === 'Price';
      });
      this.prices = this.pricesFilter[0].Price;

    }, err => {
      swal(err.json().message, '', 'error');
    })
  }


  checkBrands(value) {
    this.brandValue = value;
  }

  checkOffers(value) {
    this.offersValue = value;
  }

  checkPrice(value) {
    this.priceValue = value;
  }

  changeSort(id, value) {
    this.filter(id, value);
  }

  filter(id, value) {
    var inData = {
      "_id": this.id,
      "_session": localStorage.session,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "brand": this.brandValue,
      "price": this.priceValue,
      "offer": this.offersValue,
      "sort": value,
      "count": 20,
      "start": 0,
      id_subcategory: localStorage.subid,
    }
    this.loginService.getProducts(inData).subscribe(response => {
      this.products = response.json().product;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - (this.products[i].sku[0].selling_price / this.products[i].sku[0].mrp) * 100
          this.products[i].sku[0].percentage = this.percentage;
        }
        this.products[i].image = this.url + this.products[i].pic[0].pic;
      }
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



}
