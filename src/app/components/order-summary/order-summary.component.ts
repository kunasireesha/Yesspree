import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AppSettings } from './../../config';
import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';
import { HeadercartComponent } from '../../components/headercart/headercart.component'
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.less', '../../components/header/header.component.less'],
    providers: [HeadercartComponent]
})
export class OrderSummaryComponent implements OnInit {
    orderSu: boolean = true;
    deliveryA: boolean = false;
    deliveryOp: boolean = false;
    paymentM: boolean = false;
    Promo: string;
    cartSummary: string;
    orderId: string;
    orders = [];
    data = {}
    cart = [];
    checkout: string;
    userName: string;
    id: string;
    timeSlot = [];
    dateSlot = [];
    summarySum;
    url;
    promoCode;
    coupon;
    addData = {
        name: '',
        phone: '',
        address1: '',
        taluk: '',
        district: '',
        state: '',
        pincode: '',
        mr: 'Mr.',
        mrs: 'Mrs.',
        city: ''
    }
    type;
    editData;
    getAddress = [];

    list = [{
        value: 'Mr.',
        selected: false
    },
    {
        value: 'Mrs.',
        selected: false
    },
    {
        value: 'Miss.',
        selected: false
    },
    {
        value: 'M/S.',
        selected: false
    }]


    constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router, public header: HeadercartComponent) {
        this.route.queryParams.subscribe(params => {
            this.promoCode = params.promoCode;
            console.log(params);
        });
        if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
            this.userName = JSON.parse(localStorage.userName);
            this.id = JSON.parse(localStorage.userId);
        } else {
            this.id = '';
        }
    }

    ngOnInit() {

        this.url = AppSettings.imageUrl;
        this.checkoutSummary();
        this.header.geoLocation();
        this.header.postVillageName(localStorage.wh_pincode);
        this.getDashboard();
    }
    order() {
        this.orderSu = true;
        this.deliveryA = this.deliveryOp = this.paymentM = false
    }
    delAdd() {
        this.getAdd();
        this.deliveryA = true;
        this.orderSu = this.deliveryOp = this.paymentM = false
    }
    delOpt() {
        this.deliveryOp = true;
        this.orderSu = this.deliveryA = this.paymentM = false
    }
    paymentMethod() {
        this.paymentM = true;
        this.orderSu = this.deliveryOp = this.deliveryA = false;
    }
    postPromo(event) {
        var inData = {
            _session: localStorage.session,
            coupon_code: event,
            id_order: JSON.stringify(this.orderId)
        }
        this.loginService.postPromo(inData).subscribe(response => {
            if (response.json().data === undefined) {
                swal('Invalid Promocode', "", "error");
            } else if (response.json().status === "success") {
                swal('promo applied successfully', '', 'success');
            } else {
                swal('Invalid Promocode', "", "error");
            }
            // else {
            //   swal("please enter promo code", "", "warning");
            // }


        }, err => {
            swal('Invalid Promocode', "", "error");
        })
    }
    payOptions;
    payMethod;
    payType;
    checkoutSummary() {
        var inData = {
            _session: localStorage.session,
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse,
            lang: "en",
            _id: this.id
        }
        this.loginService.checkoutSummary(inData).subscribe(response => {
            this.cartSummary = response.json().orders;
            this.cart = response.json().cart;
            this.orderId = response.json().orders[0].order_id;
            this.dateSlot = response.json().orders[0].deliveryslot;
            this.payOptions = response.json().pay_options;
            for (var i = 0; i < this.cart.length; i++) {
                this.cart[i].percentage = Math.round(100 - (this.cart[i].sku[0].selling_price / this.cart[i].sku[0].mrp * 100));
                this.cart[i].size = this.cart[i].sku[0].size;
            }
            this.summarySum = response.json().summary;
            console.log(this.orderId);
        }, err => {
            swal(err.message, "", "error")
        })
    }
    optType(opt, type) {
        this.payType = opt;
        this.payMethod = type;
    }
    delDate;
    dateChange(Value) {
        this.delDate = Value;
        this.timeSlot = [];
        for (var i = 0; i < this.dateSlot.length; i++) {
            if (Value === this.dateSlot[i].date) {
                this.timeSlot.push(this.dateSlot[i].times);
                console.log(this.timeSlot);
                return;
            }

        }
    }
    deltime;
    timeChange(time) {
        this.deltime = time;
    }
    cartCheckout(grand) {
        if (this.payType && this.payMethod === undefined) {
            swal("Plese select payment option", "", "warning");
        }
        this.data = {
            "id_order": JSON.stringify(this.orderId),
            "total_paid": JSON.stringify(grand),
            "pay_type": this.payType,
            "pay_option": this.payMethod,
            "delivery_slot": this.delDate + "," + this.deltime,
            "express": 1
        }
        this.orders.push(this.data);
        var inData = {
            _id: this.id,
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse,
            lang: "en",
            orders: this.orders
        }
        this.loginService.checkOut(inData).subscribe(response => {
            if (response.json().status === 'success') {
                this.router.navigate(["/"]);
                swal("Order placed successfully", "", "success");
            }
            // else {
            //     swal(response.json().message, '', 'error');
            // }

        }, err => {
            console.log(err)
        })
    }



    //for address type
    buttonType(type) {
        this.type = type;
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



    createAdd() {
        if (this.addData.name === '' || this.addData.name === undefined || this.addData.name === null ||
            this.addData.phone === '' || this.addData.phone === undefined || this.addData.phone === null ||
            this.addData.address1 === '' || this.addData.address1 === undefined || this.addData.address1 === null ||
            this.addData.taluk === '' || this.addData.taluk === undefined || this.addData.taluk === null ||
            this.addData.district === '' || this.addData.district === undefined || this.addData.district === null ||
            this.addData.city === '' || this.addData.city === undefined || this.addData.city === null ||
            this.addData.state === '' || this.addData.state === undefined || this.addData.state === null ||
            this.addData.pincode === '' || this.addData.pincode === undefined || this.addData.pincode === null) {
            swal('Fileds are missing', '', 'warning');
            return;
        }
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
            mr: 'Mr.',
            mrs: 'Mrs.',
            city: ''
        }
    }

    //radio buttons
    mr;
    mrs;
    prefix;

    checkPrefix(prefixVAlue) {
        this.prefix = prefixVAlue;
    }

    checkoutDelivery(id) {
        var inData = {
            "op": "update",
            "id_address": id,
            "selected": "1"
        }
        this.loginService.checkoutaddress(inData).subscribe(reponse => {
            swal("address selected", "", "success");
        })
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
    }

    itemHeaderDecrease(cart, name, id, skuid, index) {
        this.header.itemDecrease(cart, name, id, skuid, index);
        this.getDashboard();
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
