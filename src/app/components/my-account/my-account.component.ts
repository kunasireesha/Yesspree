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
<<<<<<< HEAD
  id;
  url;
  productId;
  coupons;
  promoCode;
  mrp;
  grandTotal;
  cartCount;
  wishCount;
  ordersData;
  skuData = []
  sku = {
    mycart: 0
  }
  unsubscribe = false;
  summary
  subscribe = false;
  discount;
  cancelPlan;
  ngOnInit() {


    // this.getCart();

    // this.getWishlist();
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
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = 0;
    }
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
      this.getAdd();
    } else if (this.pageNav === "orders1") {
      this.myOrders1 = true;
      this.ordersDetails();
    } else if (this.pageNav === "address2") {
      this.myOrders2 = true;
    } else if (this.pageNav === "cart") {
      this.mycart = true;
      this.getCart();
    } else if (this.pageNav === "subscription") {
      this.mysubscription = true;
      this.subscriptionActive();
    } else if (this.pageNav === "offers") {
      this.offers = true;
    } else if (this.pageNav === "rateus") {
      this.rateUs = true;
    } else if (this.pageNav === "notifications") {
      this.mynotifiactions = true;
      var nParams = {
        "id_customer": this.id,
        "parent_warehouseid": localStorage.parent_warehouseid,
        "id_warehouse": localStorage.id_warehouse,
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
    else if (this.pageNav === "wishlistpage") {
      this.wishlist = true;
      this.getWishlist();
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

=======
    id;
    url;
    productId;
    coupons;
    promoCode;
    mrp;
    grandTotal;
    cartCount;
    wishCount;
    ordersData;
    skuData = []
    sku = {
        mycart: 0 
    }
    unsubscribe = false;
    summary
    subscribe = false;
    discount;
    cancelPlan;
    ngOnInit() {
        
        
        // this.getCart();
        
        // this.getWishlist();
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
        if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
            this.id = JSON.parse(localStorage.userId);
        } else {
            this.id = 0;
        }
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
            this.getAdd();
        } else if (this.pageNav === "orders1") {
            this.myOrders1 = true;
            this.ordersDetails();
        } else if (this.pageNav === "address2") {
            this.myOrders2 = true;
        } else if (this.pageNav === "cart") {
            this.mycart = true;
            this.getCart();
        } else if (this.pageNav === "subscription") {
            this.mysubscription = true;
              this.subscriptionActive();
        } else if (this.pageNav === "offers") {
            this.offers = true;
        } else if (this.pageNav === "rateus") {
            this.rateUs = true;
        } else if (this.pageNav === "notifications") {
            this.mynotifiactions = true;
            var nParams = {
                "id_customer": this.id,
                "parent_warehouseid": localStorage.parent_warehouseid,
                "id_warehouse": localStorage.id_warehouse,
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
        else if (this.pageNav === "wishlistpage") {
            this.wishlist = true;
            this.getWishlist();
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
>>>>>>> 659154793e1238616da6b2aa9ed1ef8ff6e61e5a
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
<<<<<<< HEAD

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
      "parent_warehouseid": localStorage.parent_warehouseid,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en",
      "_session": localStorage.session

    }
    this.loginService.getWishlist(inData).subscribe(response => {
      this.WishList = response.json().result;
      this.summary = response.json().summary;
      for (var i = 0; i < this.WishList.length; i++) {
        this.WishList[i].image = this.url + this.WishList[i].pic[0].pic;
      }
      this.wishCount = response.json().summary.cart_count;
      this.grandTotal = response.json().summary.grand_total;
      console.log(this.WishList);
    }, error => {
      console.log(error);
    })
  }
  removeWish(id) {
    var inData = {
      "_session": localStorage.session,
      "_id": this.id,
      "id_product": id,
      "op": "delete",
      "parent_warehouseid": localStorage.parent_warehouseid,
      "id_warehouse": localStorage.id_warehouse,
      "lang": "en"
    }
    this.loginService.deleteWish(inData).subscribe(response => {

      console.log(response)
      this.getWishlist();
    }, error => {

    })
  }

  subscriptionActive() {
    this.mysubscription = true;
    this.unsubscribe = false;
    var inData = {
      "type": "Active",
      "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
      "id_warehouse": JSON.parse(localStorage.id_warehouse),
      "lang": "en"
    }
    this.loginService.subscriptionActive(inData).subscribe(response => {
      this.subscribedOrders = response.json().orders;
      console.log(this.subscribedOrders);
      // this.subscribe = false;
    })
  }
  subscriptionCancel() {
    this.mysubscription = false;
    var inData = {
      "type": "Cancelled",
      "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
      "id_warehouse": JSON.parse(localStorage.id_warehouse),
      "lang": "en"
    }
    this.loginService.subscriptionCancel(inData).subscribe(response => {
      this.ordersData = response.json().orders;
      this.unsubscribe = true;

    })
  }
  itemIncrease(data, name, id, skuId, index, action) {
    this.selected = index;
    let thisObj = this;

    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        this.sku.mycart = parseInt(data[i].sku[0].mycart);
      }
    }
    this.sku.mycart = Math.floor(this.sku.mycart + 1);
    thisObj.addCart(this.sku.mycart, id, skuId, action);
    localStorage.setItem('cartName', name);

  }

  itemDecrease(data, name, id, skuId, index, action) {
    this.selected = index;
    let thisObj = this;
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        this.sku.mycart = parseInt(data[i].sku[0].mycart);
      }
    }
    // if(this.sku.mycart === 0) {
    //   return;
    // }
    this.sku.mycart = Math.floor(this.sku.mycart - 1);
    this.addCart(this.sku.mycart, id, skuId, action);
  }
  addCart(quantity, id, skuId, action) {
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
      if (action === 'wishList') {
        this.wishlist = true;
        this.mycart = false;
        this.getWishlist();
      } else if (action === 'mycart') {
        this.wishlist = false;
        this.mycart = true;
        this.getCart();
      }
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }
  getCart() {
    this.url = AppSettings.imageUrl;
    var inData = {
      _id: JSON.parse(localStorage.userId),
      _session: localStorage.session,
      op: "get",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      lang: "en"
    }
    this.loginService.getCart(inData).subscribe(response => {
      this.mrp = response.json().summary.mrp;
      this.grandTotal = response.json().summary.grand_total;
      this.cartCount = response.json().summary.cart_count;
      this.mycart = response.json().cart;
      this.skuData = response.json().cart.sku;
      this.summary = response.json().summary;
    }, err => {
      console.log(err)
    })
  }
  subscriptionStatus(num) {
    var inData = {
      _id: this.id,
      order_no: num,
      order_status: "Cancelled",
      cancelled_on: new Date()
    }
    this.loginService.subscriptionStatus(inData).subscribe(reponse => {
      swal('cancelled order', "", "success");
      this.subscriptionActive();
    })
  }
  ordersDetails() {
    var inData = {
      type: 'Present',
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      "lang": "en"

    }
    this.loginService.myorders(inData).subscribe(response => {
      this.orders = response.json().orders;
      console.log(this.orders);
    }, err => {
      console.log(err)
    })
  }
=======
    
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
            "parent_warehouseid": localStorage.parent_warehouseid,
            "id_warehouse": localStorage.id_warehouse,
            "lang": "en",
            "_session": localStorage.session
            
        }
        this.loginService.getWishlist(inData).subscribe(response => {
            this.WishList = response.json().result;
            this.summary =  response.json().summary;
            for (var i = 0; i < this.WishList.length; i++) {
                this.WishList[i].image = this.url + this.WishList[i].pic[0].pic;
            }
            this.wishCount = response.json().summary.cart_count;
            this.grandTotal = response.json().summary.grand_total;
            console.log(this.WishList);
        }, error => {
            console.log(error);
        })
    }
    removeWish(id) {
        var inData = {
            "_session": localStorage.session,
            "_id": this.id,
            "id_product": id,
            "op": "delete",
            "parent_warehouseid": localStorage.parent_warehouseid,
            "id_warehouse": localStorage.id_warehouse,
            "lang": "en"
        }
        this.loginService.deleteWish(inData).subscribe(response => {
            
            console.log(response)
            this.getWishlist();
        }, error => {
            
        })
    }
    
    subscriptionActive() {
        this.mysubscription = true;
        this.unsubscribe = false;
        var inData = {
            "type": "Active",
            "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
            "id_warehouse": JSON.parse(localStorage.id_warehouse),
            "lang": "en"
        }
        this.loginService.subscriptionActive(inData).subscribe(response => {
            this.subscribedOrders = response.json().orders;
            console.log(this.subscribedOrders);
            // this.subscribe = false;
        })
    }
    subscriptionCancel() {
        this.mysubscription = false; 
        var inData = {
            "type": "Cancelled",
            "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
            "id_warehouse": JSON.parse(localStorage.id_warehouse),
            "lang": "en"
        }
        this.loginService.subscriptionCancel(inData).subscribe(response => { 
            this.ordersData = response.json().orders; 
            this.unsubscribe = true;
            
        }) 
    }
    itemIncrease(data, name, id, skuId, index,action) {
        this.selected = index;
        let thisObj = this;
        
        for(var i=0;i<data.length;i++){
            if(data[i].name === name){
                this.sku.mycart = parseInt(data[i].sku[0].mycart);
            }
        }
        this.sku.mycart = Math.floor(this.sku.mycart + 1);
        thisObj.addCart(this.sku.mycart, id, skuId,action);
        localStorage.setItem('cartName', name);
        
    }
    
    itemDecrease(data, name, id, skuId, index,action) {
        this.selected = index;
        let thisObj = this;
        for(var i=0;i<data.length;i++){
            if(data[i].name === name){
                this.sku.mycart = parseInt(data[i].sku[0].mycart);
            }
        }
        // if(this.sku.mycart === 0) {
        //   return;
        // }
        this.sku.mycart = Math.floor(this.sku.mycart - 1 );
        this.addCart(this.sku.mycart, id, skuId,action);
    }
    addCart(quantity, id, skuId,action) {
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
            if(action==='wishList'){
                this.wishlist=true;
                this.mycart=false;
                this.getWishlist();
            }else if(action==='mycart'){
                this.wishlist=false;
                this.mycart=true;
                this.getCart();
            }
        }, err => {
            swal(err.json().message, '', 'error');
        })
    }
    getCart() {
        this.url = AppSettings.imageUrl;
        var inData = {
            _id: JSON.parse(localStorage.userId),
            _session: localStorage.session,
            op: "get",
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse,
            lang: "en"
        }
        this.loginService.getCart(inData).subscribe(response => {
            this.mrp = response.json().summary.mrp;
            this.grandTotal = response.json().summary.grand_total;
            this.cartCount = response.json().summary.cart_count;
            this.mycart = response.json().cart;
            this.skuData = response.json().cart.sku;
            this.summary = response.json().summary;
        }, err => {
            console.log(err)
        })
    }
    subscriptionStatus(num){
        var inData = {
            _id: this.id,
            order_no:num,
            order_status:"Cancelled",
            cancelled_on:new Date()
        }
        this.loginService.subscriptionStatus(inData).subscribe(reponse =>{
            swal('cancelled order', "", "success");
            this.subscriptionActive();
        })
    }
    ordersDetails(){
        var inData = {
            type: 'Present',
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse,
            "lang":"en"
            
        }
        this.loginService.myorders(inData).subscribe(response => {
            this.orders = response.json().orders;
            console.log(this.orders);
        }, err => {
            console.log(err)
        })
    }
>>>>>>> 659154793e1238616da6b2aa9ed1ef8ff6e61e5a
}
