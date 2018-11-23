import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';
import { HeadercartComponent } from '../../components/headercart/headercart.component'


@Component({
  selector: 'app-banner-navigation',
  templateUrl: './banner-navigation.component.html',
  styleUrls: ['./banner-navigation.component.css', '../product/product.component.less', '../../components/header/header.component.less'],
  providers: [HeadercartComponent]
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
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router, public header: HeadercartComponent) {
    this.route.queryParams.subscribe(params => {
      this.type = params.type
      this.target = params.target
    })
  }
  skudata = [];

  ngOnInit() {
    this.url = AppSettings.imageUrl;
    this.getAllData();
    this.getDashboard();
    this.header.geoLocation();
    this.header.postVillageName(localStorage.wh_pincode);

  }

  getAllData() {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = 0;
    }
    if (this.type === 'brand') {
      var inData = {
        "_id": this.id,
        "_session": localStorage.session,
        "brand": this.target,
        "count": 20,
        "start": 0,
        "wh_pincode": localStorage.wh_pincode,
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en"
      }
      this.loginService.brands(inData).subscribe(response => {
        this.brandData = response.json().product;
        for (var i = 0; i < this.brandData.length; i++) {
          for (var j = 0; j < this.brandData[i].sku.length; j++) {
            if (this.brandData[i].sku[j].mrp !== undefined) {
              this.percentage = 100 - (this.brandData[i].sku[j].selling_price / this.brandData[i].sku[j].mrp) * 100
              this.brandData[i].sku[j].percentage = Math.round(this.percentage);
              this.brandData[i].sku[j].productName = this.brandData[i].name;
            }
            this.brandData[i].sku[j].wishlist = this.brandData[i].wishlist;
            this.brandData[i].sku[j].image = this.url + this.brandData[i].pic[0].pic;
            this.skudata.push(this.brandData[i].sku[j]);
          }
        }
      }, error => {
      })



    } else if (this.type === 'search') {
      var params2 = {
        "_id": this.id,
        "_session": localStorage.session,
        "search": this.target,
        "count": 20,
        "start": 0,
        "wh_pincode": localStorage.wh_pincode,
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en"
      }
      this.loginService.searchAll(params2).subscribe(response => {
        this.brandData = response.json().product;
        for (var i = 0; i < this.brandData.length; i++) {
          for (var j = 0; j < this.brandData[i].sku.length; j++) {
            if (this.brandData[i].sku[j].mrp !== undefined) {
              this.percentage = 100 - (this.brandData[i].sku[j].selling_price / this.brandData[i].sku[j].mrp) * 100
              this.brandData[i].sku[j].percentage = Math.round(this.percentage);
              this.brandData[i].sku[j].productName = this.brandData[i].name;
            }
            this.brandData[i].sku[j].wishlist = this.brandData[i].wishlist;
            this.brandData[i].sku[j].image = this.url + this.brandData[i].pic[0].pic;
            this.skudata.push(this.brandData[i].sku[j]);
          }
        }
      }, error => {

      })
    }
    else if (this.type === 'category') {
      var params1 = {
        "_id": this.id,
        "_session": localStorage.session,
        "category": this.target,
        "count": 20,
        "start": 0,
        "wh_pincode": localStorage.wh_pincode,
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en"
      }
      this.loginService.category(params1).subscribe(response => {
        this.brandData = response.json().product;
        for (var i = 0; i < this.brandData.length; i++) {
          for (var j = 0; j < this.brandData[i].sku.length; j++) {
            if (this.brandData[i].sku[j].mrp !== undefined) {
              this.percentage = 100 - (this.brandData[i].sku[j].selling_price / this.brandData[i].sku[j].mrp) * 100
              this.brandData[i].sku[j].percentage = Math.round(this.percentage);
              this.brandData[i].sku[j].productName = this.brandData[i].name;
            }
            this.brandData[i].sku[j].wishlist = this.brandData[i].wishlist;
            this.brandData[i].sku[j].image = this.url + this.brandData[i].pic[0].pic;
            this.skudata.push(this.brandData[i].sku[j]);
          }
        }
        console.log(this.skudata);

      }, error => {

      })
    } else {
      var params = {
        "_id": this.id,
        "_session": localStorage.session,
        "sku": this.target,
        "count": 20,
        "start": 0,
        "wh_pincode": localStorage.wh_pincode,
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en"
      }
      this.loginService.skuInfo(params).subscribe(response => {
        this.brandData = response.json().product;
        for (var i = 0; i < this.brandData.length; i++) {
          for (var j = 0; j < this.brandData[i].sku.length; j++) {
            if (this.brandData[i].sku[j].mrp !== undefined) {
              this.percentage = 100 - (this.brandData[i].sku[j].selling_price / this.brandData[i].sku[j].mrp) * 100
              this.brandData[i].sku[j].percentage = Math.round(this.percentage);
              this.brandData[i].sku[j].productName = this.brandData[i].name;
            }
            this.brandData[i].sku[j].wishlist = this.brandData[i].wishlist;
            this.brandData[i].sku[j].image = this.url + this.brandData[i].pic[0].pic;
            this.skudata.push(this.brandData[i].sku[j]);
          }
        }
      }, error => {

      })
    }

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
    this.getDashboard();
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
      wh_pincode: localStorage.wh_pincode,
      parent_warehouseid: JSON.parse(localStorage.parent_warehouseid),
      id_warehouse: JSON.parse(localStorage.id_warehouse)
    }
    this.loginService.getCart(inData).subscribe(response => {
      this.subSubCatData = response.json();
      swal("Item added to cart", "", "success")
      // swal("Item added to cart", "", "success", {
      //   buttons: ["", "Okay"],
      // }).then((value) => {
      //   if (value === true) {
      //     window.location.reload();
      //   }
      // });
    }, err => {
      swal(err.json().message, '', 'error');
    })
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
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en"

      }
      this.loginService.wish(inData).subscribe(response => {
        this.wishList = response.json();
        swal(response.json().message, "", "success");
        this.getAllData();
        if (response.json().status === "failure") {
          swal(response.json().message, "", "error");
        }

      }, err => {
        console.log(err)
      })
    }
  }
  showProductDetails(prod) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        proId: prod.id_product
      }
    }
    this.router.navigate(["/product_details"], navigationExtras);
  }

  cartCount;
  grandTotal;
  categoryData;
  getHeadCart() {
    this.header.getCart();
  }

  itemHeaderIncrease(cart, name, id, skuid, index) {
    this.header.itemIncrease(cart, name, id, skuid, index);
  }

  itemHeaderDecrease(cart, name, id, skuid, index) {
    this.header.itemDecrease(cart, name, id, skuid, index);
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
      localStorage.setItem('cartCount', response.json().summary.cart_count);
      localStorage.setItem('grandtotal', response.json().summary.grand_total)
      this.cartCount = localStorage.cartCount;
      this.grandTotal = localStorage.grandtotal;
      this.categoryData = response.json().result.category;

    }, err => {
      console.log(err)
    });
  }
}
