import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { AppSettings } from '../../config';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { HeadercartComponent } from '../../components/headercart/headercart.component'
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MycartComponent } from '../../components/mycart/mycart.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.less', '../../components/header/header.component.less', '../../components/home/home.component.less'],
    providers: [HeadercartComponent, MycartComponent, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class ProductsComponent implements OnInit {
    model1: Date;
    model2: Date;

    get today() {
        return new Date();
    }



    constructor(private router: Router, private route: ActivatedRoute, public loginService: DataService, public http: Http, public header: HeadercartComponent, public removecart: MycartComponent) {
        this.pageNav = this.route.snapshot.data[0]['page'];
        if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
            this.id = JSON.parse(localStorage.userId);
        } else {
            this.id = 0
        }

        if (this.pageNav === 'items') {

            this.showDetails = false;
            this.route.queryParams.subscribe(params => {
                this.subCatId = params.id;
                this.subName = params.name;
                this.catName = this.subName;
            });
            this.getProducts(this.subCatId);
            this.getsubCetData();

        }
        if (this.pageNav === 'details') {
            this.showDetails = true;

            this.route.queryParams.subscribe(params => {
                this.productId = params.proId;
                this.subCatId = params.catId
                this.subName = params.name;
                this.productDetails(this.productId);
                this.getsubCetData();

            });

        }


    }
    prefix;
    productId;
    ngOnInit() {
        this.model2 = new Date();

        this.url = AppSettings.imageUrl;

        if (this.subCatId === '') {
            this.shownodata = true;

        } else {
            this.shownodata = false;
        }
        this.filterData();
        this.url = AppSettings.imageUrl;
        //get subcat data
        if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
            this.id = JSON.parse(localStorage.userId)
        } else {
            this.id = 0
        }
        this.getsubCetData();
        this.header.geoLocation();
        this.header.postVillageName(localStorage.wh_pincode);
        this.getDashboard();

    }

    getsubCetData() {
        var inData = {
            _id: this.id,
            id_category: this.subCatId,
            _session: localStorage.session,
            pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode,
            "parent_warehouseid": localStorage.parent_warehouseid,
            "id_warehouse": localStorage.id_warehouse,
            "lang": "en"
        }
        this.loginService.getSubcat(inData).subscribe(response => {
            this.subcatdata = response.json().result.category;
        }, err => {
            console.log(err)
        })
    }

    pageNav;
    shownodata = false;
    showCategories = false;
    showCat = true;
    showsubcat = false;
    showlastcat = false;
    showSubCategories = false;
    showInput = true;
    showInput1 = false;
    showDetails = false;
    showSubscriptionData = false;
    showInputs = true;
    subCatId;
    showdetailInput;
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
    prodId;
    product;
    firstPic;
    specificProd;
    weak;
    catName;
    alternateid;
    selectedskusize;
    likeProd = [];
    //sub sub categories
    showsubSubCat(index, subId) {

        this.selectedCat = index;
        this.showCategories = true;
        var inData = {
            _id: this.id,
            id_category: subId,
            _session: localStorage.session,
            pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode,
            "parent_warehouseid": localStorage.parent_warehouseid,
            "id_warehouse": localStorage.id_warehouse,
            "lang": "en"
        }
        this.loginService.getLastCatData(inData).subscribe(response => {
            this.subSubCatData = response.json().result.category;

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
            pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode,
            "parent_warehouseid": localStorage.parent_warehouseid,
            "id_warehouse": localStorage.id_warehouse,
            "lang": "en"
        }
        this.loginService.getSubSubCatData(inData).subscribe(response => {
            this.lastCatData = response.json().result.sub_category;
        }, err => {
            console.log(err)
        })
    }
    closeLastCat() {
        this.showSubCategories = false;
    }
    //end last categories

    subcatName;
    lastcatName;
    showCateProd(id, name) {
        this.showDetails = false;
        this.showCat = true;
        this.catName = name;
        this.showlastcat = false;
        this.showsubcat = false;
        this.getProducts(id);
    }

    getSubcatProd(id, name) {
        this.subcatName = name;
        this.showsubcat = true;
        this.showlastcat = false;
        this.getProducts(id);
    }

    getLastProd(id, name) {
        this.lastcatName = name;
        this.showlastcat = true;

        this.getProducts(id);
    }

    skudata = [];
    //get products
    getProducts(id) {
        this.skudata = [];
        this.idforrefine = localStorage.setItem('subid', id);
        var inData = {
            _id: this.id,
            id_subcategory: id,
            _session: localStorage.session,
            wh_pincode: localStorage.wh_pincode,
            "parent_warehouseid": localStorage.parent_warehouseid,
            "id_warehouse": localStorage.id_warehouse,
            lang: "en",
        }
        this.loginService.getProducts(inData).subscribe(response => {
            this.products = response.json().product;
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
        this.showDetails = true;

        let navigationExtras: NavigationExtras = {
            queryParams: {
                proId: proId.id_product,
                catId: this.subCatId
            }
        }
        this.router.navigate(["/product_details"], navigationExtras);
    }


    // itemIncrease(data, name, id, skuId, index) {
    //   this.selected = index;
    //   let thisObj = this;
    //   if (localStorage.catname !== name) {
    //     thisObj.items.quantity = 0;
    //   }
    //   if (name === data.name) {
    //     thisObj.showInputs = true;
    //     thisObj.showInput = true;
    //     thisObj.items.quantity = Math.floor(thisObj.items.quantity + 1);
    //     thisObj.getCart(thisObj.items.quantity, id, skuId);
    //     localStorage.setItem('catname', name);
    //   }
    // }


    //add to cart
    // detailsitemIncrease(data, name, id, skuId) {
    //     let thisObj = this;
    //     thisObj.showInputs = true;
    //     thisObj.showInput = true;
    //     thisObj.items.quantity = thisObj.items.quantity + 1;
    //     thisObj.getCart(thisObj.items.quantity, id, skuId);
    //     // localStorage.setItem('size', size);
    //     // localStorage.setItem('name', name);
    // }
    quantity;
    detailquantity;
    detailsitemIncrease(data, size, name, id, skuId, index) {
        if (size === undefined) {
            swal('Please select size', '', 'warning');
            return;
        }
        let thisObj = this;
        thisObj.showdetailInput = true;
        this.selected = index;
        if (localStorage.size !== size || localStorage.name !== name) {
            thisObj.detailquantity = 0;
        }
        if (name === data.productName) {
            thisObj.showdetailInput = true;
            thisObj.detailquantity = parseInt(thisObj.detailquantity) + 1;
            thisObj.getCart(thisObj.detailquantity, id, skuId);
            localStorage.setItem('size', size);
            localStorage.setItem('name', name);

            // this.header.ngOnInit();
        }
        this.getDashboard();
    }

    detailsitemDecrease(id, skuId, index) {
        // this.selected = index;
        let thisObj = this;
        if (thisObj.detailquantity === 1 || thisObj.detailquantity === '1') {
            thisObj.showdetailInput = false;
            this.removecart.removeCart(id, skuId);
            this.getDashboard();
            return;
        }
        thisObj.detailquantity = Math.floor(thisObj.detailquantity - 1);
        this.getCart(thisObj.detailquantity, id, skuId);
    }

    itemIncrease(data, size, name, id, skuId, index) {
        this.selected = index;
        let thisObj = this;
        if (localStorage.size !== size || localStorage.name !== name) {
            thisObj.items.quantity = 0;
        }
        if (name === data.productName) {
            thisObj.showInputs = true;
            thisObj.showInput = true;
            thisObj.items.quantity = thisObj.items.quantity + 1;
            thisObj.getCart(thisObj.items.quantity, id, skuId);
            localStorage.setItem('size', size);
            localStorage.setItem('name', name);

            // this.header.ngOnInit();
        }
        this.getDashboard();
    }


    itemDecrease(id, skuId, index) {
        this.selected = index;
        let thisObj = this;
        if (thisObj.items.quantity === 1) {
            this.selected = undefined;
            thisObj.showInput = true;
            this.removecart.removeCart(id, skuId);
            this.getDashboard();
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
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse
        }
        this.loginService.getCart(inData).subscribe(response => {
            swal("Item added to cart", "", "success");
            this.cartCount = response.json().summary.cart_count;
            this.grandTotal = response.json().summary.grand_total;
            // swal("Item added to cart", "", "success", {
            //   buttons: ['', "Okay"],
            // }).then((value) => {
            //   if (value === true) {
            //     window.location.reload();
            //   }
            // });
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
            if (this.brandsFilter !== undefined) {
                this.brandsFilter = _.filter(response.json().refine, function (obj) {
                    return obj.name === 'Brand';
                });
                this.brands = this.brandsFilter[0].Brand;
                console.log(this.brands);
            }
            //offers
            if (this.offersFilter !== undefined) {
                this.offersFilter = _.filter(response.json().refine, function (obj) {
                    return obj.name === 'Offer';
                });
                this.offers = this.offersFilter[0].Offer;
            }
            //prices
            if (this.offersFilter !== undefined) {
                this.pricesFilter = _.filter(response.json().refine, function (obj) {
                    return obj.name === 'Price';
                });
                this.prices = this.pricesFilter[0].Price;
            }
        }, err => {
            swal(err.json().message, '', 'error');
        })
    }


    checkBrands(value) {
        this.brandValue = value;
        console.log(this.brandValue);
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

    clearAll() {
        this.offersValue = this.priceValue = this.brandValue = '';

    }

    filter(id, value) {
        this.skudata = [];
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
            swal('Applied Successfully', '', 'success');
            for (var i = 0; i < this.products.length; i++) {
                for (var j = 0; j < this.products[i].sku.length; j++) {
                    if (this.products[i].sku[j].mrp !== undefined) {
                        this.percentage = 100 - (this.products[i].sku[j].selling_price / this.products[i].sku[j].mrp) * 100
                        this.products[i].sku[j].percentage = Math.round(this.percentage);
                        this.products[i].sku[j].productName = this.products[i].name;
                        this.products[i].sku[j].categoryId = this.products[i].id_category;
                    }
                    this.products[i].sku[j].wishlist = this.products[i].wishlist;
                    this.products[i].sku[j].image = this.url + this.products[i].pic[0].pic;
                    this.skudata.push(this.products[i].sku[j]);
                }
            }

        }, err => {
            swal(err.json().message, '', 'error');
        })
    }

    wish(id) {
        if (localStorage.authkey === undefined) {
            swal('Please Login', '', 'warning');
            return;
        }
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
                // swal(response.json().message, "", "error")
            } else {
                this.wishList = response.json();
                swal("Wishlisted", "", "success");
                //
            }
            this.productDetails(id);
            this.getProducts(this.subCatId);

        }, err => {
            console.log(err)
        })
    }

    //get product details
    skuspecificdata = [];

    detailsproduct;
    skus;
    pics = [];
    productIdSub;
    skulikedata = [];
    productDetails(id) {
        this.skus = [];
        this.skuspecificdata = [];
        this.skulikedata = [];
        var inData = {
            _id: this.id,
            _session: localStorage.session,
            products: id,
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse,
            lang: "en",
        }
        this.loginService.productDetails(inData).subscribe(response => {
            this.product = response.json().product;
            this.pics = this.product[0].pic;
            this.percentage = 100 - (this.product[0].sku[0].selling_price / this.product[0].sku[0].mrp) * 100
            this.product[0].sku[0].productName = this.product[0].name;
            this.product[0].sku[0].percentage = Math.round(this.percentage);
            this.product[0].sku[0].image = this.url + this.product[0].pic[0].pic;
            this.product[0].sku[0].category = this.product[0].category;
            this.product[0].sku[0].isSubscribe = this.product[0].is_subscribe;
            this.product[0].sku[0].id_product = this.product[0]._id;
            this.detailsproduct = this.product[0].sku[0];
            this.detailquantity = this.detailsproduct.mycart;

            if (this.detailsproduct.mycart !== '0') {
                this.showdetailInput = true;
            } else {
                this.showdetailInput = false;
            }

            for (var i = 0; i < this.product.length; i++) {
                for (var j = 0; j < this.product[i].sku.length; j++) {
                    if (this.product[i].sku[j].mrp !== undefined) {
                        this.percentage = Math.round(100 - ((this.product[i].sku[0].selling_price) / (this.product[i].sku[j].mrp) * 100));
                        this.product[i].sku[j].productName = this.product[i].name;
                        this.product[i].sku[j].percentage = Math.round(this.percentage);
                        this.product[i].sku[j].image = this.url + this.product[i].pic[0].pic;
                        this.product[i].sku[j].category = this.product[i].category;
                        this.product[i].sku[j].description = this.product[i].description;
                    }
                    this.skus.push(this.product[i].sku[j]);
                }
            }


            this.subName = this.product[0].category;
            for (var i = 0; i < this.product.length; i++) {
                this.firstPic = this.url + this.product[i].pic[0].pic;
            }
            this.specificProd = response.json().similar_data.product;
            this.likeProd = response.json().specific_product[0].product;
            // for (var i = 0; i < this.specificProd.length; i++) {
            //   this.specificProd[i].image = this.url + this.specificProd[i].pic[0].pic;
            // }
            for (var i = 0; i < this.specificProd.length; i++) {
                for (var j = 0; j < this.specificProd[i].sku.length; j++) {
                    if (this.specificProd[i].sku[j].mrp !== undefined) {
                        this.percentage = 100 - (this.specificProd[i].sku[j].selling_price / this.specificProd[i].sku[j].mrp) * 100
                        this.specificProd[i].sku[j].percentage = Math.round(this.percentage);
                        this.specificProd[i].sku[j].productName = this.specificProd[i].name;
                        this.specificProd[i].sku[j].categoryId = this.specificProd[i].id_category;
                    }
                    this.specificProd[i].sku[j].wishlist = this.specificProd[i].wishlist;
                    this.specificProd[i].sku[j].image = this.url + this.specificProd[i].pic[0].pic;
                    this.skuspecificdata.push(this.specificProd[i].sku[j]);


                }
            }


            for (var i = 0; i < this.likeProd.length; i++) {
                for (var j = 0; j < this.likeProd[i].sku.length; j++) {
                    if (this.likeProd[i].sku[j].mrp !== undefined) {
                        this.percentage = 100 - (this.likeProd[i].sku[j].selling_price / this.likeProd[i].sku[j].mrp) * 100
                        this.likeProd[i].sku[j].percentage = Math.round(this.percentage);
                        this.likeProd[i].sku[j].productName = this.likeProd[i].name;
                        this.likeProd[i].sku[j].categoryId = this.likeProd[i].id_category;
                    }
                    this.likeProd[i].sku[j].wishlist = this.likeProd[i].wishlist;
                    this.likeProd[i].sku[j].image = this.url + this.likeProd[i].pic[0].pic;
                    this.skulikedata.push(this.likeProd[i].sku[j]);
                }
            }
        }, err => {
            console.log(err);
        })
    }

    showSubscribeDetails() {
        this.showSubscriptionData = !this.showSubscriptionData;
    }

    subscribe(weak) {
        this.weak = weak;

    }

    skusize(sku) {

        sku.isSubscribe = this.detailsproduct.isSubscribe;
        this.detailsproduct = sku;
        this.selectedskusize = sku.size;
        if (sku.mycart === '0') {
            this.showdetailInput = false;
        } else {
            this.showdetailInput = true;
            this.detailquantity = sku.mycart;
        }

    }
    startDate;
    subscribeData(skuId, ProId) {
        var today = new Date(this.model2);
        var dd = today.getDate();
        var mm = today.getMonth();

        var yyyy = today.getFullYear();
        this.startDate = dd + '-' + mm + '-' + yyyy;

        if (this.prefix == 'Alternate Days') {
            this.alternateid = 1;
        } else {
            this.alternateid = 0;
        }
        if (this.selectedskusize === '' || this.selectedskusize === undefined) {
            swal('Please select size', '', 'error');
            return;
        }
        var inData = {
            "day": this.weak,
            "id_product": ProId,
            "id_sku": skuId,
            "is_alternate": this.alternateid.toString(),
            "is_doorbellring": "1",
            "pay_type": "COD",
            "quantity": this.selectedskusize,
            "start_date": this.startDate,
            "subscription_type": this.prefix
        }
        this.loginService.productSubscription(inData).subscribe(response => {
            if (response.json().status === 200) {
                swal(response.json().message, '', 'success');
            } else {
                swal(response.json().message, '', 'error');
            }
        })
    }
    checkPrefix(prefixVAlue) {
        this.prefix = prefixVAlue;
    }

    // emailFormArray: Array<any> = [{ type: '', selected: false }];
    // typeArray: Array<any> = [];
    categories = [
        { name: "Alternate Days", selected: false },
        { name: "Every Day", selected: false },
        { name: "Once a weak", selected: false },
    ];

    // onChange(email: string, isChecked: boolean) {
    //   if (isChecked) {
    //     this.emailFormArray.push({ 'type': email, selected: isChecked });
    //     this.typeArray.push(email);
    //   } else {
    //     let index = this.emailFormArray.indexOf(email);
    //     let index1 = this.typeArray.indexOf(email);
    //     this.emailFormArray.splice(index, 1);
    //     this.typeArray.splice(index1, 1);
    //   }
    // }

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
        console.log(localStorage.wh_pincode);
        console.log(this.id);
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
