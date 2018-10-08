import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/login/login';
import { AppSettings } from '../../config';
import { empty } from 'rxjs';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  id;
  url;
  productId;
  coupons;
  promoCode;
  mrp;
  grandTotal;
  cartCount;
  ordersData;
  sku = [];
  subscribeactive = false;
  discount;
  cancelPlan;
  ngOnInit() {

    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = 0;
    }
    // this.getCart();
    this.getAdd();
    this.getWishlist();
    localStorage.getItem;
    this.url = AppSettings.imageUrl;
  }

  public itemsList: Object[] = [
    {
      title: 'Collapsible Group Item #1',
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    },
    {
      title: 'Collapsible Group Item #2',
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    },
    {
      title: 'Collapsible Group Item #3',
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    }
  ]
  pageNav: string;
  myaccountData = false;
  deliveryAddress = false;
  myOrders1 = false;
  myOrders2 = false;
  mycart = false;
  mysubscription = false;
  offers = false;
  rateUs = false;
  mynotifiactions = false;
  sharescreen = false;
  wishlist = false;
  coupon = false;
  nodata = false;
  getAddress;
  editData;
  orders;
  WishList = []
  notificationList;
  myOrder;
  items = {
    quantity: 1
  }
  selected;
  quantity;
  subscribedOrders;
  createdData = []
  mydata = {
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  type;
  addData = {
    name: '',
    phone: '',
    address1: '',
    taluk: '',
    district: '',
    state: '',
    pincode: ''
  }


  constructor(private route: ActivatedRoute, public router: Router, public loginService: DataService) {
    this.pageNav = this.route.snapshot.data[0]['page'];
    if (this.pageNav === "account") {
      this.myaccountData = true;
      this.loginService.myaccount().subscribe(response => {
        this.mydata = response.json().result[0];
        localStorage.setItem('userData', JSON.stringify(response.json().result));
      }, err => {

      })
    } else if (this.pageNav === "address") {
      this.deliveryAddress = true;
    } else if (this.pageNav === "orders1") {
      this.myOrders1 = true;
      var inData = {
        type: 'Present'
      }
      this.loginService.myorders(inData).subscribe(response => {
        this.orders = response.json().orders;
      }, err => {
        console.log(err)
      })
    } else if (this.pageNav === "address2") {
      this.myOrders2 = true;
    } else if (this.pageNav === "cart") {
      this.mycart = true;
      this.getCart();
    } else if (this.pageNav === "subscription") {
      this.mysubscription = true;
    //   this.subscriptionActive();
    } else if (this.pageNav === "offers") {
      this.offers = true;
    } else if (this.pageNav === "rateus") {
      this.rateUs = true;
    } else if (this.pageNav === "notifications") {
      this.mynotifiactions = true;
      var nParams = {
        "id_customer": this.id,
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en"
      }
      this.loginService.notificationsData(nParams).subscribe(response => {
        this.notificationList = response.json();
        console.log(this.notificationList)
      }, error => {

      })
    } else if (this.pageNav === "share") {
      this.sharescreen = true;
    }
    else if (this.pageNav === "wishlist") {
      this.wishlist = true;
    }
    else if (this.pageNav === 'coupon') {
        this.coupon = true;
        var params = {
            "lang": "en"
          }
          this.loginService.offersCoupon(params).subscribe(response => {
            this.coupons = response.json().offer;
            //   this.promoCode = response.json().offer[0].promo_code;
            console.log(this.promoCode);
          });
    }
  }

  myaccount() {

    this.myaccountData = true;
    this.deliveryAddress = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.wishlist = false;
    this.router.navigate(['/myaccount']);
  }

  myaddress() {
    this.deliveryAddress = true;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.wishlist = false;
    this.router.navigate(['/deliveryaddress']);
  }

  myorders() {

    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = true;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.wishlist = false;
    this.router.navigate(['/ordersfirst']);
  }

  mycartData() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = true;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.wishlist = false;
    this.router.navigate(['/myAccountcart']);
  }
  mysubscriptionData() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = true;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.wishlist = false;
    this.router.navigate(['/mysubscription']);
  }

  myoffers() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = true;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.wishlist = false;
    this.router.navigate(['/myoffers']);
  }

  rateus() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = true;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.wishlist = false;
    this.router.navigate(['/myrateus']);

  }

  notificationsData() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = true;
    this.router.navigate(['/mynotifiactions']);
    this.sharescreen = false;
    this.wishlist = false;
  }

  showOrderItems() {
    this.myOrders2 = true;
    this.myOrders1 = false;
  }

  share() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.sharescreen = true;
    this.mynotifiactions = false;
    this.wishlist = false;
    this.router.navigate(['/share']);
  }
  showWishList() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.sharescreen = false;
    this.mynotifiactions = false;
    this.wishlist = true;
    this.router.navigate(['/wishlist']);
  }

  showCoupon() {
      this.deliveryAddress = false;
      this.myaccountData = false;
      this.myOrders1 = false;
      this.myOrders2 = false;
      this.mycart = false;
      this.mysubscription = false;
      this.offers = false;
      this.rateUs = false;
      this.sharescreen = false;
      this.mynotifiactions = false;
      this.wishlist = false;
      this.coupon = true;
      this.router.navigate(['/coupon']);

    //   let navigationExtras: NavigationExtras = {
    //     queryParams: {
    //       promoCode:this.promoCode
    //     }
    //   }
        // this.router.navigate(['/coupon'],navigationExtras);
  }
  update() {
    var inData = {
      _id: JSON.parse(localStorage.userId),
      first_name: this.mydata.first_name,
      last_name: this.mydata.last_name,
      email: this.mydata.email,
      mobile: this.mydata.mobile

    }
    this.loginService.update(inData).subscribe(response => {
      swal("Updated successfully", '', "success");
      localStorage.removeItem("userName");
      localStorage.setItem("userName", JSON.stringify(response.json().result[0].first_name + ' ' + response.json().result[0].last_name));
      localStorage.removeItem("userMobile");
       localStorage.setItem("userMobile", response.json().result[0].mobile);
    }, err => {
      swal(err.msg, '', "error")
    })
  }

  //for address type
  buttonType(type) {
    this.type = type;
  }

  //create address
  createAdd() {
    var inData = {
      op: "create",
      pincode: this.addData.pincode,
      id_customer: localStorage.userId,
      name: this.addData.name,
      phone: JSON.parse(localStorage.userData).mobile,
      address1: this.addData.address1,
      city: "hyd",
      state: this.addData.state,
      person_prefix: JSON.parse(localStorage.userData).person_prefix,
      taluk: this.addData.taluk,
      district: this.addData.district,
      lat: "5550",
      lon: "123",
      landmark: "hyd",
      selected: true,
      type: this.type,
      country: "India"

    }
    this.loginService.createAdd(inData).subscribe(response => {
      swal("Created successfully", "", "success");
      this.getAdd();
      this.clearData();
    }, err => {

    })
  }
  // clear input fields
  clearData() {
    this.addData = {
      name: '',
      phone: '',
      address1: '',
      taluk: '',
      district: '',
      state: '',
      pincode: '',
    }
  }


  //get address
  getAdd() {
    var inData = {
      op: "get"
    }
    this.loginService.getAdd(inData).subscribe(response => {
      this.getAddress = response.json().result
    }, err => {
      swal(err.message, "", "error")
    })
  }

  //delete address
  deleteAdd(id) {
    var inData = {
      op: "delete",
      id_address: id
    }

    swal("Do you want to delete?", "", "warning", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {

      if (value === true) {
        this.loginService.deleteAdd(inData).subscribe(response => {
          this.getAdd();
          swal("Deleted successfully", "", "success");
        }, err => {
          swal(err.message, "", "error")
        })
      } else {
        return;
      }
    });
  }

  //edit address
  editAdd(item) {
    this.editData = item;
    for (var i = 0; i < this.getAddress.length; i++) {
      if (item._id === this.getAddress[i]._id) {
        this.addData = {
          name: this.getAddress[i].name,
          phone: this.getAddress[i].phone,
          address1: this.getAddress[i].address1,
          taluk: this.getAddress[i].taluk,
          district: this.getAddress[i].district,
          state: this.getAddress[i].state,
          pincode: this.getAddress[i].pincode,
        }
      }
    }
  }

  //update address    
  updateAdd() {
    var inData = {
      op: "update",
      id_address: this.editData._id,
      id_customer: this.editData.id_customer,
      name: this.addData.name,
      phone: this.addData.phone,
      address1: this.addData.address1,
      city: this.editData.city,
      state: this.addData.state,
      person_prefix: this.editData.person_prefix,
      taluk: this.addData.taluk,
      district: this.addData.district,
      lat: this.editData.lat,
      lon: this.editData.lon,
      landmark: this.editData.landmark,
      selected: this.editData.selected,
      type: this.type,
      pincode: this.addData.pincode
    }

    this.loginService.updateAdd(inData).subscribe(response => {
      this.getAdd();
      swal("Updated successfully", "", "success");
    }, err => {
      swal(err.message, "", "error");
    })
  }
  getWishlist() {
    var inData = {
        "_id": this.id,
        "op": "get",
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en",
        "_session": localStorage.session
    
    }
    this.loginService.getWishlist(inData).subscribe(response=> {
      this.WishList = response.json().result;
      this.grandTotal = response.json().summary.grand_total;
      console.log(this.WishList);
    },error=> {
      console.log(error);
    })
  }
  removeWish(id){
    var inData = {
        "_session": localStorage.session,
        "_id": this.id,
        "id_product": id,
        "op": "delete",
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en"
    }
    this.loginService.deleteWish(inData).subscribe(response => {
    console.log(response)
    this.getWishlist();
    },error=> {


    })
  }
  subscriptionActive() {
      var inData = {
      "type": "Active",
      "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
      "id_warehouse": JSON.parse(localStorage.id_warehouse),
      "lang": "en"
      }
      this.loginService.subscriptionActive(inData).subscribe(response => {
       this.subscribedOrders = response.json().orders;
    //    for(var i= 0 ; i<this.subscribedOrders.length;i++){
    //        this.discount = this.subscribedOrders[i].order.total_selling_price;
           
    //    }
       this.subscribeactive = true;
       swal("subscribed", '', 'success');
      })
  }
  subscriptionCancel() {
    var inData = {
        "type": "Cancelled",
        "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse": JSON.parse(localStorage.id_warehouse),
        "lang": "en"
      }
      this.loginService.subscriptionActive(inData).subscribe(response => {  
          this.ordersData = response.json().orders;   
          this.subscribeactive = false;
          alert(this.ordersData); 
            swal("unsubscribed", '', 'success');       
      }) 
  }
  getCart(){
    this.url = AppSettings.imageUrl;
    var inData = {
      _id: JSON.parse(localStorage.userId),
      _session: localStorage.session,
      op: "get",
      parent_warehouseid: JSON.parse(localStorage.parent_warehouseid),
      id_warehouse: JSON.parse(localStorage.id_warehouse),
      lang: "en"
    }
    this.loginService.getCart(inData).subscribe(response => {
        this.mrp = response.json().summary.mrp;
        this.grandTotal = response.json().summary.grand_total;
        this.cartCount = response.json().summary.cart_count;
        this.mycart = response.json().cart;
        this.sku = response.json().cart.sku;
        console.log(this.mycart);
    }, err => {
      console.log(err)
    })
  }
  itemIncrease(data, name, id, skuId, index) {
    alert(index)
    this.selected = index;
    let thisObj = this;
    if (localStorage.name !== name) {
      thisObj.items.quantity = 0;
    }
    if (name === data.name) {
      // thisObj.showInput = true;
      thisObj.items.quantity = Math.floor(thisObj.items.quantity + 1);
      // thisObj.getCart(thisObj.items.quantity, id, skuId);
      localStorage.setItem('name', name);
    }
  }

  itemDecrease(id, skuId, index) {
    alert(index)
    this.selected = index;
    let thisObj = this;
    if (thisObj.items.quantity === 1) {
      return;
    }
    thisObj.items.quantity = Math.floor(thisObj.items.quantity - 1);
    // this.getCart(thisObj.items.quantity, id, skuId);
  }
  subscriptionStatus(num){
      var inData = {
        _id: this.id,
        order_no:num,
        order_status:"Cancelled",
        cancelled_on:new Date()
      }
      this.loginService.subscriptionStatus(inData).subscribe(reponse =>{
        swal('cancelled order', "", "error")
      })
  }
}
