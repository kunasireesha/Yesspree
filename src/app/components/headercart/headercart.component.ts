import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { catList } from '../../services/catList';
import { CatListServices } from '../../services/catListService';
import { AppSettings } from '../../config';
import { AuthServices } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-headercart',
  templateUrl: './headercart.component.html',
  styleUrls: ['./headercart.component.css', '../../components/header/header.component.less']
})
export class HeadercartComponent implements OnInit {

  constructor(public loginService: DataService, public router: Router,
    public authService: AuthServices,
    public catSer: CatListServices) { }

  ngOnInit() {
    if (localStorage.id_warehouse === undefined || localStorage.id_warehouse === '' || localStorage.id_warehouse === null) {
      localStorage.setItem('id_warehouse', "2");
      localStorage.setItem('parent_warehouseid', "1");
    }

    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = '0';
    }
    this.url = AppSettings.imageUrl;
    this.geoLocation();
    this.postVillageName(localStorage.wh_pincode);

    this.getDashboard();
  }
  dashboardData = [];
  cartCount;
  grandTotal;
  url;
  categoryData;
  id;
  village = [];
  mrp: number;
  mycart = [];
  search: string;
  mycartImg: string;
  productId;
  pincode;
  percentage;
  id_warehouse;
  parent_warehouseid;
  latlocation;
  lanLocation;
  getPin;
  selected;
  sku = {
    mycart: 0
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
      this.dashboardData = response.json().result;
      this.cartCount = response.json().summary.cart_count;
      this.grandTotal = response.json().summary.grand_total;
      this.categoryData = response.json().result.category;
    }, err => {
      console.log(err)
    });
  }

  grandPer;
  savedMoney;
  removecartvalue = false;
  quantity;
  getCart() {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = 0;
    }
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      op: "get",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      lang: "en"
    }
    this.loginService.getCart(inData).subscribe(response => {
      this.mrp = response.json().summary.mrp;
      this.grandTotal = response.json().summary.grand_total;
      this.mycart = response.json().cart;
      for (var i = 0; i < this.mycart.length; i++) {
        if (this.mycart[i].sku[0].mrp !== undefined) {
          this.percentage = Math.round(100 - (this.mycart[i].sku[0].selling_price / this.mycart[i].sku[0].mrp) * 100);
          this.mycart[i].sku[0].percentage = this.percentage;
        }
      }
      this.savedMoney = this.mrp - this.grandTotal;
      this.grandPer = Math.ceil(100 - (this.grandTotal / this.mrp) * 100)
    }, err => {
      console.log(err)
    })
  }

  subscribe(id, name) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        proId: id,
        name: name
      }
    }
    this.router.navigate(["/product_details"], navigationExtras);
  }

  postVillageName(pin) {
    var inData = {
      wh_pincode: pin
    }
    this.loginService.postVillageName(inData).subscribe(response => {
      this.village = response.json().result;
      this.id_warehouse = response.json().id_warehouse;
      this.parent_warehouseid = response.json().parent_warehouseid;
      // localStorage.setItem('id_warehouse', this.id_warehouse);
      // localStorage.setItem('parent_warehouseid', this.parent_warehouseid);
    }, err => {
      console.log(err)
    })
  }

  changeVillageName(data, villageData) {
    for (var i = 0; i < villageData.length; i++) {
      if (data === villageData[i].pincode) {
        localStorage.setItem('id_warehouse', villageData[i].id_warehouse);
        localStorage.setItem('parent_warehouseid', villageData[i].parent_warehouseid);
        localStorage.setItem('pincode', villageData[i].pincode)
      }
    }
  }


  geoLocation() {
    localStorage.setItem('id_warehouse', "2");
    localStorage.setItem('parent_warehouseid', "1");
    localStorage.setItem('wh_pincode', '560078');
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.latlocation = position.coords.latitude;
    //     this.lanLocation = position.coords.longitude;
    //     var latlng = { lat: this.latlocation, lng: this.lanLocation };
    //     let geocoder = new google.maps.Geocoder();
    //     geocoder.geocode({ 'location': latlng }, (results, status) => {
    //       if (status == google.maps.GeocoderStatus.OK) {
    //         let result = results[0];
    //         this.getPin = JSON.parse(results[0].address_components[5].long_name);
    //         localStorage.setItem('wh_pincode', this.getPin);
    //         this.postVillageName(this.getPin);
    //         let rsltAdrComponent = result.address_components;
    //         let resultLength = rsltAdrComponent.length;
    //         if (result != null) {
    //           //  console.log(rsltAdrComponent[resultLength-5].short_name)
    //         } else {
    //           window.alert('Geocoder failed due to: ' + status);
    //         }
    //       }
    //     });
    //   });

    // }
  }


  //add to cart
  itemIncrease(data, name, id, skuId, index) {
    this.selected = index;
    let thisObj = this;
    // if (localStorage.cartName !== name) {
    //   this.sku.mycart = 0;
    // }
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        this.sku.mycart = parseInt(data[i].sku[0].mycart);
      }
    }
    this.sku.mycart = Math.floor(this.sku.mycart + 1);
    thisObj.addCart(this.sku.mycart, id, skuId);
    localStorage.setItem('cartName', name);
    this.getCart();
  }

  itemDecrease(data, name, id, skuId, index) {
    console.log(data);
    this.selected = index;

    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        this.sku.mycart = parseInt(data[i].sku[0].mycart);
      }
    }
    if (this.sku.mycart === 1) {
      this.sku.mycart = Math.floor(this.sku.mycart - 1);
      this.removeCart(data[0]._id, skuId);
      this.removecartvalue = true;
    } else {
      this.sku.mycart = Math.floor(this.sku.mycart - 1);
      this.addCart(this.sku.mycart, id, skuId);
    }
  }


  addCart(quantity, id, skuId) {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = 0;
    }
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
      if (response.json().status === "failure") {
        swal(response.json().message, '', 'error');
      } else {
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
        this.getCart();
      }
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }

  myControl = new FormControl();
  options: string[] = [];
  data: any;
  searchProducts(event) {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = 0;
    }
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      count: this.data.length,
      id_warehouse: localStorage.id_warehouse,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      search: this.data,
      start: 0
    }
    this.loginService.searchProducts(inData).subscribe(response => {
      if (response.json().product[0] === undefined) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            proId: ''
          }
        }
        this.router.navigate(["/product_details"], navigationExtras);
      } else {
        for (var i = 0; i < response.json().product.length; i++) {
          if (response.json().product[i].name === this.data) {
            this.productId = response.json().product[i]._id;
          }
        }
        let navigationExtras: NavigationExtras = {
          queryParams: {
            proId: this.productId
          }
        }
        this.router.navigate(["/product_details"], navigationExtras);
      }
    }, err => {
      console.log(err)
    })
  }
  showDrop = false;
  public updated() {
    this.showDrop = true;
    this.options = [];
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = '0';
    }
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      count: this.myControl.value.length,
      id_warehouse: localStorage.id_warehouse,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      search: this.myControl.value,
      start: 0
    }
    if (this.myControl.value.length > 0) {
      this.loginService.searchProducts(inData).subscribe(response => {
        let all = response.json().product;
        let searchedWord = this.myControl.value
        for (let key in all) {
          let r = all[key].name.search(new RegExp(searchedWord, "i"));
          if (r != -1) {
            this.options.push(all[key])
            console.log(this.options);
          }
        }
      })

    } else {
      this.options = []
    }
  }

  selectValue(value) {
    this.data = value;
    console.log(this.data);
    this.showDrop = false;
  }

  selectedCat;
  showSubcat = false;
  //show subcategorie
  showSubcategorie(id, name, index) {
    this.selectedCat = index;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
        name: name
      }
    }
    let categories: catList = {
      cat_Id: id
    };
    this.catSer.categories = categories;
    this.showSubcat = true;
    this.router.navigate(["/childcat"], navigationExtras);
  }

  removeCart(product, sku) {

    var inData = {
      _id: this.id,
      _session: localStorage.session,
      id_product: product,
      id_sku: sku
    }
    this.loginService.removeCart(inData).subscribe(response => {
      swal("item removed successfully", "", "success")
      // swal("item removed successfully", '', 'success', {
      //   buttons: ["", "Okay"],
      // }).then((value) => {
      //   if (value === true) {
      //     window.location.reload();
      //   }
      // });

      this.getCart();
      this.getDashboard();
    })
  }
}
