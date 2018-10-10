import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.less', '../product/product.component.less']
})
export class ProductdetailsComponent implements OnInit {
  id;
  prodId;
  product;
  url;
  firstPic;
  specificProd;
  percentage;
  showInputs = true;
  productDetail: string;
  weak;
  checked;
  selected;
  quantity;
  showInput1 = false;
  subSubCatData;
  items = {
    quantity: 1
  }
  constructor(private route: ActivatedRoute, public router: Router, public loginService: DataService) {
    this.route.queryParams.subscribe(params => {
      this.prodId = params.proId;
    });
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = ''
    }
  }

  ngOnInit() {
    this.url = AppSettings.imageUrl;
    this.productDetails();

  }
  showSubscriptionData = false;
  showCategories = true;
  showSubCategories = true;
  data = '';
  email = '';
  showInput = false;

  showSubscribeDetails() {
    this.showSubscriptionData = !this.showSubscriptionData;
  }

  submit() {
    console.log(this.data + ' ' + this.email);
  }

  showProduxtDetails() {
    this.router.navigate(["/product_details"]);
  }

  collapse() {
    this.showCategories = !this.showCategories;

  }


  showInputValue() {
    this.showInput = true;
  }

  showInputValue1() {
    this.showInput1 = true;
  }

  productDetails() {
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      products: this.prodId,
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      lang: "en",
    }
    this.loginService.productDetails(inData).subscribe(response => {
      this.product = response.json().product;
      console.log(this.product);
      for (var i = 0; i < this.product.length; i++) {
        if (this.product[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - ((this.product[i].sku[0].selling_price) / (this.product[i].sku[0].mrp) * 100)
          this.product[i].sku[0].percentage = this.percentage;
        }
      }

      for (var i = 0; i < this.product.length; i++) {
        this.firstPic = this.url + this.product[i].pic[0].pic;
      }
      this.specificProd = response.json().specific_product[0].product;
      for (var i = 0; i < this.specificProd.length; i++) {
        this.specificProd[i].image = this.url + this.specificProd[i].pic[0].pic;
      }
      for (var i = 0; i < this.specificProd.length; i++) {
        if (this.specificProd[i].sku[0].mrp !== undefined) {
          this.percentage = 100 - ((this.specificProd[i].sku[0].selling_price) / (this.specificProd[i].sku[0].mrp) * 100)
          this.specificProd[i].sku[0].percentage = this.percentage;
          console.log(this.specificProd[i].sku[0].percentage)
        }
      }
    }, err => {
      console.log(err);
    })
  }

  subscribe(weak) {
    this.weak = weak
  }
  subscribeData(productId, sku, check) {
    var inData = {
      "day": this.weak,
      "id_product": productId,
      "id_sku": sku,
      "is_alternate": "1",
      "is_doorbellring": "1",
      "pay_type": "COD",
      "quantity": "1",
      "start_date": "Sun, 26 Aug 2018",
      "subscription_type": check
    }
    this.loginService.productSubscription(inData).subscribe(response => {
      swal("subscribed", '', 'success');
    })
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
  itemIncrease(data, name, id, skuId, index) {
    this.selected = index;
    let thisObj = this;
    if (localStorage.name !== name) {
      thisObj.items.quantity = 0;
    }
    if (name === data.name) {
      thisObj.showInputs = true;
      thisObj.items.quantity = Math.floor(thisObj.items.quantity + 1);
      thisObj.getCart(thisObj.items.quantity, id, skuId);
      localStorage.setItem('name', name);
    }
  }
}