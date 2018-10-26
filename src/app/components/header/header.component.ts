import { MyAccountComponent } from './../my-account/my-account.component';
import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/login/login';
import swal from 'sweetalert';
import { AppSettings } from '../../config';
import { catList } from '../../services/catList';
import { CatListServices } from '../../services/catListService';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { AuthServices } from '../../services/auth.service';
import { } from 'googlemaps';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @ViewChild(MyAccountComponent) myaccountcmp: MyAccountComponent;

  village = [];
  mrp: number;
  grandTotal: number;
  mycart = [];
  search: string;
  mycartImg: string;
  productId;
  pincode;
  cartCount;
  constructor(
    public loginService: DataService,
    private socialAuthService: AuthService,
    public router: Router,
    public catSer: CatListServices,
    public authService: AuthServices
  ) {
    this.cartCount = localStorage.cartCount;

  }
  otpData;
  userName;
  forData;
  userMobile;
  dashboardData;
  categoryData;
  url;
  catId;
  id;
  percentage;
  selected;
  sku = {
    mycart: 0
  }
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    conpassword: '',
    referalCode: '',
    otp: '',
    lId: '',
    pincode: '',
    searchParam: '',
    forEmail: '',
    otpEmail: '',
    forMobile: '',
    newPw: ''
  }
  errorObj = {
    firstNameErr: false,
    lastNameErr: false,
    phoneErr: false,
    passwordErr: false,
    emailErr: false,
    phone: false,
    password: false,
    referalCodeErr: false,
    otp: false,
    lId: false,
    pincode: false,
    searchParam: false,
    otpErr: false
  }
  geolocationPosition;
  mapsAPILoader;
  latlocation;
  lanLocation;
  summary;
  postalCode;
  currentLocation
  getPin;
  id_warehouse;
  parent_warehouseid;

  clearFields() {
    this.formData.firstName = this.formData.lastName = this.formData.email = this.formData.forMobile = this.formData.password = this.formData.conpassword = this.formData.referalCode = ''
  }

  randomkey;
  ngOnInit() {

    if (localStorage.id_warehouse === undefined || localStorage.id_warehouse === '' || localStorage.id_warehouse === null) {
      localStorage.setItem('id_warehouse', "2");
      localStorage.setItem('parent_warehouseid', "1");

    }
    this.geoLocation();
    this.postVillageName(localStorage.wh_pincode);

    this.url = AppSettings.imageUrl;
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.showLogin = false;
      this.showProfile = true;
      this.userName = JSON.parse(localStorage.userName);
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.showLogin = true;
      this.showProfile = false;
      this.id = 0;
    }
    if (localStorage.userData !== undefined) {
      this.userMobile = JSON.parse(localStorage.userMobile);
    }


    //for dashboard data
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
      localStorage.setItem('cartCount', response.json().summary.cart_count)
      this.cartCount = localStorage.cartCount;
      this.categoryData = response.json().result.category;
    }, err => {
      console.log(err)
    });
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

  showProfile: boolean
  showModal = false;
  showOpacity = false;
  showSignin = false;
  showRegistration = false;
  showOtp = false;
  showForgotPassword = false;
  showSubcat = false;
  showLogin = true;
  showReOtp = false;
  changepw = false;
  showOtpForRegister = false
  openSingin() {
    this.showModal = true;
    this.showSignin = true;
    this.showRegistration = false;
    this.showOpacity = true;
    this.showOtp = false;
    this.showForgotPassword = false;
    this.showOtpForRegister = false;
    this.changepw = false;
  }
  //registration link
  openRegistration() {
    this.showModal = true;
    this.showSignin = false;
    this.showRegistration = true;
    this.showOpacity = true;
    this.showOtp = false;
    this.showForgotPassword = false;
    this.showOtpForRegister = false;
    this.changepw = false;
  }

  //show otp screen
  openOtpScreen() {
    var validData = false;
    if (this.formData.firstName === '' || this.formData.firstName === undefined || this.formData.firstName === null) {
      validData = false
    } else {
      validData = true
    }

    if (this.formData.password = this.formData.conpassword) {
      validData = true;
    } else if (this.formData.phone === '' || this.formData.phone === undefined || this.formData.phone === null) {
      validData = false
    } else if (this.formData.referalCode === '' || this.formData.referalCode === undefined || this.formData.referalCode === null) {
      validData = false
    } else {
      validData = false
    }

    if (validData) {
      var inData = {
        first_name: this.formData.firstName,
        last_name: this.formData.lastName,
        email: this.formData.email,
        mobile: this.formData.forMobile,
        password: this.formData.password,
        person_prefix: this.prefix,
        referred_code: this.formData.referalCode
      }

      this.loginService.requestOtp(inData).subscribe(response => {
        this.otpData = response.data;

        if (response.json().status === 'failure') {
          swal(response.json().message, '', 'error');
        } else {
          swal("Otp Sent to your mobile number", " ", "success");
          this.showForgotPassword = false;
          // this.showLoginandRegistration = false;
          this.showRegistration = false
          this.showModal = true;
          this.showOpacity = true;
          this.showOtp = false;
          this.showOtpForRegister = true;
        }
      }, err => {
        if (err.json().status === 400) {
          // this.msg = this.translate.instant("common.loginErrMsg");
          swal(err.json().message, " ", "error").then((value) => {

          });
        };
      });
    } else {
      swal("Required Fields are Missing", "", "warning");
    }
  }


  //social login
  public socialLogin(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      console.log(socialPlatformProvider);
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
      }
    );
  }
  // forgot password
  openForgotpassword() {
    this.showModal = true;
    this.showSignin = false;
    this.showRegistration = false;
    this.showOpacity = true;
    this.showOtp = false;
    this.showForgotPassword = true;
  }
  //close popup
  onCloseCancel() {
    this.showModal = false;
    if (this.showModal === false) {
      this.showOpacity = false;
    }
  }
  openLogin() {
    this.showModal = true;
    this.showRegistration = false;
    this.showOpacity = true;
    this.showForgotPassword = false;
    this.showOtp = false;


  }
  showReOtpScreen() {
    this.showReOtp = true;
    this.showOtp = false;
  }
  login() {
    var validdata = false;
    this.changepw = false;
    if (this.formData.phone === '' || this.formData.phone === undefined || this.formData.phone === null) {
      this.errorObj.phoneErr = true;
    } else {
      this.errorObj.phoneErr = false;
      validdata = true;
    }

    if (this.formData.password === '' || this.formData.password === undefined || this.formData.password === null) {
      this.errorObj.passwordErr = true;
    } else {
      this.errorObj.passwordErr = false;
      validdata = true;
    }


    if (validdata) {
      var inData = {
        email: this.formData.email,
        password: this.formData.password,
        device_id: "abcd12_123",
        device_token: "abcd12_123",
        device_type: "desktop"
      }
      this.loginService.login(inData).subscribe(response => {
        if (response.json().status === "failure") {
          swal(response.json().message, " ", "error");
        } else {
          swal("Login Successfully", " ", "success");
          localStorage.setItem('userId', JSON.stringify(response.json().result[0]._id));
          localStorage.setItem('userName', JSON.stringify(response.json().result[0].first_name + ' ' + response.json().result[0].last_name));
          localStorage.setItem('authkey', response.json().key);
          localStorage.setItem('userData', JSON.stringify(response.json().result[0]));
          localStorage.setItem("userMobile", response.json().result[0].mobile);
          localStorage.setItem('issocial', 'false');
          this.userName = JSON.parse(localStorage.userName);
          this.formData.email = this.formData.password = '';
          this.onCloseCancel();
          this.showProfile = true;
          this.showLogin = false;
        }
        this.router.navigate(["/"]);

      }, err => {
        if (err.status === 400) {
          swal(err.message, " ", "error").then((value) => {

          });
        };
      });
    }
  }
  forgot() {
    var inData = {
      email: this.formData.forMobile
    }
    if (this.formData.forMobile === '') {
      swal("Fill the field", "", "warning");
    } else {
      this.loginService.forgot(inData).subscribe(response => {
        if (response.json().status === "failure") {
          swal(response.json().message, " ", "error");
        } else {
          this.forData = response.json().result[0];
          this.showForgotPassword = false;
          this.showRegistration = false
          this.showModal = true;
          this.showOpacity = true;
          this.showOtp = true;
          swal(response.json().message, " ", "success");
        }
      }, err => {
        swal(err.json().message, "", "error")
      })
    }

  }
  checkOtp(action) {
    var inData = {
      otp: JSON.parse(this.formData.otp),
      email: JSON.parse(this.formData.forMobile)
    }
    if (this.formData.otp === '') {
      swal("Fill the field", "", "warning");
    } else {
      this.loginService.checkOtp(inData).subscribe(response => {
        if (response.json().status === "failure") {
          swal(response.json().message, " ", "error");
        } else {
          swal(response.json().message, "", "success");
          this.showOtp = false;
          if (action === 'forgotpswrd') {
            this.changepw = true;
          } else {
            this.changepw = false;
            swal(response.json().message, "", "success");

            this.clearFields();
            this.showSignin = true;
            this.showForgotPassword = false;
            this.showRegistration = false
            this.showModal = true;
            this.showOpacity = true;
            this.showOtp = false;
            this.showOtpForRegister = false;
          }
        }

      }, err => {
        swal(err.json().message, "", "error")
      })
    }

  }
  mr;
  mrs;
  prefix;
  mrsprefix;
  checkPrefix(prefixVAlue) {
    this.prefix = prefixVAlue;
  }
  checkmrsPrefix(prefixVAlue) {
    this.mrsprefix = prefixVAlue;
  }


  updatePw() {
    var inData = {
      first_name: this.forData.first_name,
      _id: this.forData._id,
      last_name: this.forData.last_name,
      email: this.forData.email,
      mobile: this.forData.mobile,
      password: this.formData.newPw,
      birthday: ''
    }
    this.loginService.updatePw(inData).subscribe(response => {
      if (response.json().status === "failure") {
        swal(response.json().message, '', 'error');
      } else {
        swal("Password changed", "", "success");
        this.onCloseCancel();
        this.formData.forMobile = '';
      }
    }, err => {
      swal(err.json().message, "", "error")
    })
  }
  //logout
  logout() {
    if (localStorage.issocial === 'true') {
      localStorage.removeItem("userData");
      localStorage.removeItem("userId");
      localStorage.removeItem("key");
      localStorage.removeItem("userName");
      localStorage.removeItem("issocial");
      localStorage.removeItem('authkey');

      swal("Successfully log out", '', "success");
      this.showProfile = false;
      this.showLogin = true;
      this.router.navigate(["/"]);
      this.authService.logout();
    } else if (localStorage.issocial === 'false') {
      localStorage.removeItem("userData");
      localStorage.removeItem("userId");
      localStorage.removeItem("key");
      localStorage.removeItem("userName");
      localStorage.removeItem("issocial");
      localStorage.removeItem('authkey');
      swal("Successfully log out", '', "success");
      this.showProfile = false;
      this.showLogin = true;
      this.router.navigate(["/"]);
    }

  }


  resendOtp() {
    var inData = {
      mobile: JSON.parse(localStorage.getItem("userMobile"))
    }
    this.loginService.resendOtp(inData).subscribe(response => {
      if (response.json().status === "failure") {
        swal(response.json().message, '', 'error');
      } else {
        swal(response.json().message, '', "success");
      }
    }, err => {
      swal(err.json().message, '', "error");
    })
  }
  selectedCat;
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

  searchProducts(event) {
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      count: event.length,
      id_warehouse: localStorage.id_warehouse,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      search: event,
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
        this.productId = response.json().product[0]._id;
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


  grandPer;
  savedMoney;
  quantity;
  getCart() {
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
      console.log(this.mycart);
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


  //add to cart
  itemIncrease(data, name, id, skuId, index) {
    alert(index)
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
    alert(index)
    this.selected = index;
    // if (this.sku.mycart === 1) {
    //   return;
    // }
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        this.sku.mycart = parseInt(data[i].sku[0].mycart);
      }
    }
    this.sku.mycart = Math.floor(this.sku.mycart - 1);
    this.addCart(this.sku.mycart, id, skuId);
  }


  addCart(quantity, id, skuId) {
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
        swal("Item added to cart", "", "success", {
          buttons: ["", "Okay"],
        }).then((value) => {
          if (value === true) {
            window.location.reload();
          }
        });
        this.getCart();
      }
    }, err => {
      swal(err.json().message, '', 'error');
    })
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
        swal("Login Successfully", " ", "success");
        this.onCloseCancel();
        this.showSignin = false;
        this.showProfile = true;
        this.showLogin = false;
      })
      .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle().then((res) => {
      swal("Login Successfully", " ", "success");
      this.onCloseCancel();
      this.showSignin = false;
      this.showProfile = true;
      this.showLogin = false;

    })
      .catch((err) => console.log(err));
  }

}
