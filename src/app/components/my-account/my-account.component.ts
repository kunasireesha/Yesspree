import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/login/login';
import { AppSettings } from '../../config';
import { empty } from 'rxjs';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';


@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
    feedback: any;
    rating;
    input;
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
        mycart: 1
    }
    unsubscribe = false;
    summary
    subscribe = false;
    discount;
    cancelPlan;
    sharedData;
    summaryselPri;
    summarymrpPrice;
    savePer;
    showPer;
    ngOnInit() {
        this.url = AppSettings.imageUrl;

        // this.getCart();

        // this.getWishlist();
        localStorage.getItem;
        this.url = AppSettings.imageUrl;
        //dashboard
        var inData = {
            _id: this.id,
            device_type: "web",
            _session: localStorage.session,
            lang: "en",
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse,
            pincode: "560075"
        }
        this.loginService.getDashboardData(inData).subscribe(response => {
            this.sharedData = response.json().reffer;
        }, err => {
            console.log(err)

        });
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
        mobile: '',
        dob: ''
    };
    type;

    addData = {
        name: '',
        phone: '',
        address1: '',
        taluk: '',
        district: '',
        state: '',
        pincode: '',
        city: '',
        locality: ''
    }

    dobValidation = "/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/"

    constructor(private route: ActivatedRoute, public router: Router, public loginService: DataService, private fb: FacebookService) {
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
            // this.feedBack();
        } else if (this.pageNav === "notifications") {
            this.mynotifiactions = true;
            var nParams = {
                "id_customer": this.id,
                "parent_warehouseid": localStorage.parent_warehouseid,
                "id_warehouse": localStorage.id_warehouse,
                "lang": "en"
            }
            this.loginService.notificationsData(nParams).subscribe(response => {
                this.notificationList = response.json().result;
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
            mobile: this.mydata.mobile,
            birthday: this.mydata.dob
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
            city: this.addData.city,
            state: this.addData.state,
            person_prefix: JSON.parse(localStorage.userData).person_prefix,
            taluk: this.addData.taluk,
            district: this.addData.district,
            lat: "5550",
            lon: "123",
            landmark: this.addData.locality,
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
            city: '',
            locality: ''
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
                    city: this.getAddress[i].city,
                    locality: this.getAddress[i].landmark
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
    percentage;
    skudata = [];
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
                if (this.WishList[i].sku !== undefined) {
                    for (var j = 0; j < this.WishList[i].sku.length; j++) {
                        if (this.WishList[i].sku[j].mrp !== undefined) {
                            this.percentage = 100 - (this.WishList[i].sku[j].selling_price / parseInt(this.WishList[i].sku[j].mrp)) * 100
                            this.WishList[i].sku[j].percentage = Math.round(this.percentage);
                            this.WishList[i].sku[j].productName = this.WishList[i].name;
                        }
                        this.WishList[i].sku[j].image = this.url + this.WishList[i].pic[0].pic;
                        this.WishList[i].sku[j].selected = false;
                        this.skudata.push(this.WishList[i].sku[j]);

                    }
                }
            }
            this.wishCount = this.WishList.length;
            this.grandTotal = response.json().summary.grand_total;
            console.log(this.skudata);
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
        this.unsubscribe = true;
        var inData = {
            "type": "Cancelled",
            "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
            "id_warehouse": JSON.parse(localStorage.id_warehouse),
            "lang": "en"
        }
        this.loginService.subscriptionCancel(inData).subscribe(response => {
            this.ordersData = response.json().orders;


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
            wh_pincode: localStorage.wh_pincode,
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: JSON.parse(localStorage.id_warehouse)
        }
        this.loginService.getCart(inData).subscribe(response => {

            if (action === 'wishList') {
                this.wishlist = true;
                this.mycart = false;
                this.getWishlist();
                swal("Item added to wishlist", "", "success")
            } else if (action === 'mycart') {
                this.wishlist = false;
                this.mycart = true;
                this.getCart();
                swal("Item added to cart", "", "success", {
                    buttons: ["", "Okay"],
                }).then((value) => {
                    if (value === true) {
                        window.location.reload();
                    }
                });
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
            this.summaryselPri = response.json().summary.selling_price;
            this.summarymrpPrice = response.json().summary.mrp;
            this.savePer = (100 - (this.summaryselPri / this.summarymrpPrice) * 100).toFixed(0);
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
        }, err => {
            console.log(err)
        })
    }
    ratings(rate) {
        this.rating = rate;
    }
    feedBack(input) {
        var inData = {
            "id_customer": this.id,
            "op": "create",
            "rating": this.rating,
            "review": input,
            "table": "ratings_reviews"
        }
        this.loginService.rateus(inData).subscribe(response => {
            this.feedback = response.json();
            swal('Rating submitted successfully', '', 'success');
        }, err => {
            console.log(err)
        })
    }


    sharedata(url: string) {
        let params: UIParams = {
            href: 'https://github.com/zyra/ngx-facebook',
            method: 'share'
        };

        this.fb.ui(params)
            .then((res: UIResponse) => console.log(res))
            .catch((e: any) => console.error(e));
    }


    onChange(sku, isChecked: boolean) {
        if (isChecked) {
            sku.push({ selected: isChecked });
            //   this.typeArray.push(email);
            //   console.log(this.emailFormArray);
        } else {
            //   let index = this.emailFormArray.indexOf(email);
            //   let index1 = this.typeArray.indexOf(email);
            //   this.emailFormArray.splice(index, 1);
            //   this.typeArray.splice(index1, 1);
            //   console.log(this.typeArray);
        }
    }
}
