import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { AppSettings } from '../../config';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CatListServices } from '../../services/catListService';
import { catList } from '../../services/catList';
import { HeadercartComponent } from '../../components/headercart/headercart.component';

import { FormControl } from '@angular/forms';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less', '../product/product.component.less', '../../components/header/header.component.less'],
    providers: [HeadercartComponent]
})
export class HomeComponent implements OnInit {

    constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router, public catSer: CatListServices, public header: HeadercartComponent) {
        this.pageNav = this.route.snapshot.data[0]['page'];
        this.route.queryParams.subscribe(params => {
            this.catId = params.id;
        });
    }

    Village = [];
    dashboardData;
    skuid: string;
    showProducts1: boolean;
    showProducts: boolean;
    // categoryData;

    sqareBaneer1 = {
        pic: ''
    };
    sqareBaneer2 = {
        pic: ''
    };
    BigSqur;
    popProducts;
    squrBanner;
    offerBanner1 = {
        pic: ''
    };
    offerBanner2 = {
        pic: ''
    };
    offerBanner3 = {
        pic: ''
    };
    products;
    products1;
    brandsData = [];
    id;
    url;
    pageNav;
    catId;
    mainBanner;
    wishList;
    showInput = true;

    childCat = [];
    items = {
        quantity: 1
    }
    selected;
    quantity;
    squarebanner = false;
    squarebanner1 = false;

    getChildCat() {
        this.url = AppSettings.imageUrl;
        var inData = {
            id_category: this.catId,
            pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode,
            "lang": "en",
            "parent_warehouseid": localStorage.parent_warehouseid,
            "id_warehouse": localStorage.id_warehouse,

        }
        this.loginService.getSubcat(inData).subscribe(response => {
            this.childCat = response.json().result.category;
        }, err => {
            console.log(err.message, "", "error");
        })
    }

    productImage;
    subSubCatData
    slidingbanner = [];
    percentage;
    percentage1;
    skudata = [];
    skudataproducts1 = [];
    randomkey;
    categoryData = [];
    skuProducts = [];
    images = [];
    skuProducts1 = [];
    catName = [];


    ngOnInit() {
        this.url = AppSettings.imageUrl;
        this.header.geoLocation();
        this.header.postVillageName(localStorage.wh_pincode);

        this.url = AppSettings.imageUrl;
        if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
            this.id = JSON.parse(localStorage.userId)
        } else {
            this.id = 0
        }
        this.getData();
        // this.viewSpecificProducts2();
        // this.viewSpecificProducts1();
    }
    getData() {
        var inData = {
            _id: this.id,
            device_type: "desktop",
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

            this.images = [{ name: 'assets/images/thumb1.png' },
            { name: 'assets/images/thumb2.png' },
            { name: 'assets/images/thumb3.png' },
            { name: 'assets/images/thumb4.png' },
            { name: 'assets/images/thumb5.png' },
            { name: 'assets/images/thumb6.png' },
            { name: 'assets/images/thumb1.png' },
            { name: 'assets/images/thumb2.png' },
            { name: 'assets/images/thumb3.png' },
            { name: 'assets/images/thumb4.png' },
            { name: 'assets/images/thumb5.png' },
            { name: 'assets/images/thumb6.png' },]

            for (var i = 0; i < this.categoryData.length; i++) {
                this.images.push(this.url + this.categoryData[i].pic);
                // this.images.push({ 'image': this.url + this.categoryData[i].pic, 'name': this.categoryData[i].name });
                this.catName.push(this.categoryData[i].name);
            }
            // console.log(this.images);

            // this.skuid = response.json().result.specific_product[0].product[0].sku[0]._id;
            // this.categoryData = response.json().result.category;
            this.brandsData = response.json().result.brands;
            if (response.json().result.banner[0].bannerdata.length !== '' || response.json().result.banner[0].bannerdata.length !== undefined || response.json().result.banner[0].bannerdata.length !== 0) {
                this.mainBanner = response.json().result.banner[0].bannerdata;
            }

            if (response.json().result.banner[1].bannerdata.length !== '' || response.json().result.banner[1].bannerdata.length !== undefined || response.json().result.banner[1].bannerdata.length !== 0) {
                this.sqareBaneer1 = response.json().result.banner[1].bannerdata[0] || '';
                this.sqareBaneer2 = response.json().result.banner[1].bannerdata[1] || '';
            }

            if (response.json().result.banner[2].bannerdata.length !== '' || response.json().result.banner[2].bannerdata.length !== undefined || response.json().result.banner[2].bannerdata.length !== 0) {
                this.BigSqur = response.json().result.banner[2].bannerdata;
            }

            this.popProducts = response.json().result.banner[3].bannerdata;
            // }
            // 
            if (response.json().result.banner[6].bannerdata.length !== '' || response.json().result.banner[6].bannerdata.length !== undefined || response.json().result.banner[6].bannerdata.length !== 0) {
                this.squrBanner = response.json().result.banner[6].bannerdata;
            }
            if (response.json().result.banner[7].bannerdata.length !== '' || response.json().result.banner[7].bannerdata.length !== undefined || response.json().result.banner[7].bannerdata.length !== 0) {
                this.offerBanner1 = response.json().result.banner[7].bannerdata[0] || '';
                this.offerBanner2 = response.json().result.banner[7].bannerdata[1] || '';
                this.offerBanner3 = response.json().result.banner[7].bannerdata[2] || '';
            }

            //recommended products 
            if (response.json().result.specific_product[0] !== undefined) {
                if (response.json().result.specific_product[0].product.length !== '' || response.json().result.specific_product[0].product.length !== undefined || response.json().result.specific_product[0].product.length !== 0) {
                    this.products = response.json().result.specific_product[0].product;
                    // for (var i = 0; i < this.products.length; i++) {
                    //   if (this.products[i].sku[0].mrp !== undefined) {
                    //     this.percentage = 100 - (this.products[i].sku[0].selling_price / this.products[i].sku[0].mrp) * 100
                    //     this.products[i].sku[0].percentage = this.percentage;

                    //   }
                    // }



                    for (var i = 0; i < this.products.length; i++) {
                        for (var j = 0; j < this.products[i].sku.length; j++) {
                            if (this.products[i].sku[j].mrp !== undefined) {
                                this.percentage = 100 - (this.products[i].sku[j].selling_price / this.products[i].sku[j].mrp) * 100
                                this.products[i].sku[j].percentage = Math.round(this.percentage);
                                this.products[i].sku[j].productName = this.products[i].name;
                            }
                            this.products[i].sku[j].wishlist = this.products[i].wishlist;
                            this.products[i].sku[j].image = this.url + this.products[i].pic[0].pic;
                            this.skuProducts.push(this.products[i].sku[j]);
                        }
                    }

                    this.showProducts = true;
                } else {
                    this.showProducts = false;
                }
            }

            if (response.json().result.banner[5].bannerdata.length !== '' || response.json().result.banner[5].bannerdata.length !== undefined || response.json().result.banner[5].bannerdata.length !== 0) {

                this.slidingbanner = response.json().result.banner[5].bannerdata;
                //for product image
                for (var i = 0; i < this.products.length; i++) {
                    this.products[i].image = this.url + this.products[i].pic[0].pic;
                }
            }

            //recommended products1 
            if (response.json().result.specific_product[1] !== undefined) {
                if (response.json().result.specific_product[1].product.length !== '' || response.json().result.specific_product[1].product.length !== undefined || response.json().result.specific_product[1].product.length !== 0) {
                    this.products1 = response.json().result.specific_product[1].product;


                    for (var i = 0; i < this.products1.length; i++) {
                        for (var j = 0; j < this.products1[i].sku.length; j++) {
                            if (this.products1[i].sku[j].mrp !== undefined) {
                                this.percentage = 100 - (this.products1[i].sku[j].selling_price / this.products1[i].sku[j].mrp) * 100
                                this.products1[i].sku[j].percentage = Math.round(this.percentage);
                                this.products1[i].sku[j].productName = this.products1[i].name;
                            }
                            this.products1[i].sku[j].wishlist = this.products1[i].wishlist;
                            this.products1[i].sku[j].image = this.url + this.products1[i].pic[0].pic;
                            this.skuProducts1.push(this.products1[i].sku[j]);
                        }
                    }

                    for (var i = 0; i < this.products1.length; i++) {
                        this.products1[i].image = this.url + this.products1[i].pic[0].pic;
                    }
                    this.showProducts1 = true;
                } else {
                    this.showProducts1 = false;
                }
            }
        }, err => {
            console.log(err)
        })
    }

    getDashboard() {
        var inData = {
            _id: this.id,
            device_type: "desktop",
            _session: localStorage.session,
            lang: "en",
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse,
            pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode
        }
        this.loginService.getDashboardData(inData).subscribe(response => {
            this.dashboardData = response.json().result;
            // localStorage.setItem('cartCount', response.json().summary.cart_count);
            // localStorage.setItem('grandtotal', response.json().summary.grand_total)
            this.cartCount = response.json().summary.cart_count;
            this.grandTotal = response.json().summary.grand_total;
            this.categoryData = response.json().result.category;
        });

    }




    showSubData(id) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                id: id
            }
        }

        this.router.navigate(["/products"], navigationExtras);
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
            this.router.navigate(['/']);
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
            parent_warehouseid: localStorage.parent_warehouseid,
            id_warehouse: localStorage.id_warehouse
        }
        this.loginService.getCart(inData).subscribe(response => {
            this.subSubCatData = response.json();
            this.cartCount = this.subSubCatData.summary.cart_count;
            this.grandTotal = this.subSubCatData.summary.grand_total;
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
        this.skuProducts = [];
        this.skuProducts1 = [];
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
            // this.loginService.wish(inData).subscribe(response => {
            //   if (response.json().status === "failure") {
            //     swal(response.json().message, "", "error");
            //   } else {
            //     this.wishList = response.json();
            //     swal("Wishlisted", "", "success");
            //   }
            this.loginService.wish(inData).subscribe(response => {
                if (response.json().status === "failure") {
                    swal(response.json().message, "", "error");
                } else {
                    this.wishList = response.json();
                    swal("Wishlisted", "", "success");
                }
                this.getData();
            }, err => {
                console.log(err)
            })
        }
    }


    viewProducts(action) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                action: action
            }
        }
        this.router.navigate(["/recProducts"], navigationExtras);
    }
    showProductDetails(proId) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                proId: proId
            }
        }
        this.router.navigate(["/product_details"], navigationExtras);
    }
    //banner navigation
    bannerNav(type, target) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                type: type,
                target: target
            }

        }
        if (type == "explore") {
            var inData = {
                _id: this.id
            }
            this.loginService.explore(inData).subscribe(response => {
                console.log(response);
                swal("Explored successfully", "", "success");
            }, error => {
                if (error.json().status === 400) {
                    swal(error.json().message, "", "error");
                }
                console.log(error);
            })
        } else {
            this.router.navigate(["/banner_navigation"], navigationExtras);
        }

    }


    //header
    productId;
    myControl = new FormControl();
    options: string[] = [];
    data: any;
    showDrop = false;

    selectValue(value) {
        this.data = value;
        console.log(this.data);
        this.showDrop = false;
    }

    searchProducts() {
        var inData = {
            _id: this.id,
            _session: localStorage.session,
            count: this.header.data.length,
            id_warehouse: localStorage.id_warehouse,
            lang: "en",
            parent_warehouseid: localStorage.parent_warehouseid,
            search: this.header.data,
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
                    if (response.json().product[i].name === this.header.data) {
                        this.productId = response.json().product[i]._id;
                    }
                }
                // this.productId = response.json().product[0]._id;
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


    public updated() {
        this.showDrop = true;
        this.options = [];
        var inData = {
            _id: this.id,
            _session: localStorage.session,
            count: this.header.data.length,
            id_warehouse: localStorage.id_warehouse,
            lang: "en",
            parent_warehouseid: localStorage.parent_warehouseid,
            search: this.header.data,
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


    //header
    cartCount;
    grandTotal;
    getHeadCart() {
        this.header.getCart();
    }

    itemHeaderIncrease(cart, name, id, skuid, index, mycart) {
        this.header.itemIncrease(cart, name, id, skuid, index);
        this.getDashboard();
    }

    itemHeaderDecrease(cart, name, id, skuid, index, mycart) {
        this.header.itemDecrease(cart, name, id, skuid, index);
        this.getDashboard();
    }

    headerSubscribe(id, name) {
        this.header.subscribe(id, name);
    }

}
