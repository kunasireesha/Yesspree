import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';
import { HeadercartComponent } from '../../components/headercart/headercart.component';
import { MycartComponent } from '../../components/mycart/mycart.component';

@Component({
  selector: 'app-rec-products',
  templateUrl: './rec-products.component.html',
  styleUrls: ['./rec-products.component.css', '../product/product.component.less', '../home/home.component.less', '../../components/header/header.component.less'],
  providers: [HeadercartComponent, MycartComponent]

})
export class RecProductsComponent implements OnInit {
  type;
  id;
  products = []
  brands = []
  showbrands = false;
  showproducts = false;
  noData = false;
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router, public header: HeadercartComponent, public removecart: MycartComponent) {
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
  wishList;
  showInput = true;
  items = {
    quantity: 1
  }
  selected;
  skudata = [];
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
    this.getDashboard();
    this.header.geoLocation();
    this.header.postVillageName(localStorage.wh_pincode);
    this.getRecProd();

  }
  getRecProd() {
    this.skudata = [];
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
        for (var j = 0; j < this.products[i].sku.length; j++) {
          if (this.products[i].sku[j].mrp !== undefined) {
            this.percentage = 100 - (this.products[i].sku[j].selling_price / this.products[i].sku[j].mrp) * 100
            this.products[i].sku[j].percentage = Math.round(this.percentage);
            this.products[i].sku[j].productName = this.products[i].name;
          }
          this.products[i].sku[j].wishlist = this.products[i].wishlist;
          this.products[i].sku[j].image = this.url + this.products[i].pic[0].pic;
          this.skudata.push(this.products[i].sku[j]);
        }
      }

      // for (var i = 0; i < this.products.length; i++) {
      //   if (this.products[i].sku[0].mrp !== undefined) {
      //     this.percentage = 100 - (this.products[i].sku[0].selling_price / this.products[i].sku[0].mrp) * 100
      //     this.products[i].sku[0].percentage = this.percentage;
      //   }
      //   this.products[i].image = this.url + this.products[i].pic[0].pic;
      // }


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
      wh_pincode: localStorage.wh_pincode,
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: JSON.parse(localStorage.id_warehouse)
    }
    this.loginService.getCart(inData).subscribe(response => {
      swal("Item added to cart", "", "success");
      this.cartCount = response.json().summary.cart_count;
      this.grandTotal = response.json().summary.grand_total;
      // swal("Item added to cart", "", "success", {
      //   buttons: ["", "Okay"],
      // }).then((value) => {
      //   if (value === true) {
      //     window.location.reload();
      //   }
      // });
      this.getDashboard();
      this.getRecProd();
      this.items.quantity = this.quantity;
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }

  mycart;
  itemIncrease(data, size, name, id, skuId, index) {
    this.selected = index;
    let thisObj = this;
    if (localStorage.size !== size || localStorage.name !== name) {
      thisObj.mycart = 0;
    }
    if (skuId === data._id) {
      thisObj.showInput = true;

      thisObj.mycart = parseInt(data.mycart) + 1;

      thisObj.getCart(thisObj.mycart, id, skuId);

      localStorage.setItem('size', size);
      localStorage.setItem('name', name);
      // this.router.navigate(['/']);
    }


  }

  itemDecrease(data, id, skuId, index) {
    this.selected = index;
    let thisObj = this;
    if (data._id === skuId) {
      if (data.mycart === '1') {
        thisObj.mycart = parseInt(data.mycart) - 1;
        this.selected = undefined;
        thisObj.showInput = true;
        this.removecart.removeCart(id, skuId);
        this.getCart(thisObj.mycart, id, skuId);
        return;
      } else {
        thisObj.mycart = parseInt(data.mycart) - 1;
        this.getCart(thisObj.mycart, id, skuId);
      }
    }
  }



  showProductDetails(proId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        proId: proId,
        catId: this.catId
      }
    }
    this.router.navigate(["/product_details"], navigationExtras);
  }

  wish(id) {
    this.skudata = [];
    if (localStorage.userId === '' || localStorage.userId === undefined || localStorage.userId === null) {
      swal("Please Login", '', 'warning');
    } else {
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
          // swal("Wishlist already added. Please try again.", "", "error")
        } else {
          this.wishList = response.json();
          swal("Wishlisted", "", "success");
        }
        this.getRecProd();
      }, err => {
        console.log(err)
      })
    }
  }


  //header
  cartCount;
  grandTotal;
  categoryData = [];
  getHeadCart() {
    this.header.getCart();
  }

  itemHeaderIncrease(cart, name, id, skuid, index) {
    this.header.itemIncrease(cart, name, id, skuid, index);
    this.getDashboard();
    this.getRecProd();
  }

  itemHeaderDecrease(cart, name, id, skuid, index) {
    this.header.itemDecrease(cart, name, id, skuid, index);
    this.getDashboard();
    this.getRecProd();
    if (this.header.removecartvalue) {
      this.showInput = true;
      this.selected = undefined;
    }
  }
  headerSubscribe(id, name) {
    this.header.subscribe(id, name);
  }

  getDashboard() {
    var inData = {
      _id: this.id,
      device_type: "web",
      _session: localStorage.session,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.cartCount = response.json().summary.cart_count;
      this.grandTotal = response.json().summary.grand_total;
      this.categoryData = response.json().result.category;

    }, err => {
      console.log(err)
    });
  }


}
