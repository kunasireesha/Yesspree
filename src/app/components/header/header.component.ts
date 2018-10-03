import { Component, OnInit, OnChanges } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/login/login';
import swal from 'sweetalert';
import { AppSettings } from '../../config';
import { catList } from '../../services/catList';
import { CatListServices } from '../../services/catListService';

import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  Village: string;
  constructor(
    public loginService: DataService,
    private socialAuthService: AuthService,
    public router: Router,
    public catSer: CatListServices
  ) {

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

  clearFields() {
    this.formData.firstName = this.formData.lastName = this.formData.email = this.formData.forMobile = this.formData.password = this.formData.conpassword = this.formData.referalCode = ''
  }


  ngOnInit() {
    this.geoLocation()
    this.postVillageName();
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
      device_type: "desktop",
      _session: localStorage.session,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      pincode: "560075"
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.dashboardData = response.json().result;
      this.categoryData = response.json().result.category;
    }, err => {
      console.log(err)
    })
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
        person_prefix: this.formData.password,
        referred_code: this.formData.referalCode
      }

      this.loginService.requestOtp(inData).subscribe(response => {
        this.otpData = response.data;
        swal("Otp Sent to your mobile number", " ", "success");
        this.showForgotPassword = false;
        // this.showLoginandRegistration = false;
        this.showRegistration = false
        this.showModal = true;
        this.showOpacity = true;
        this.showOtp = false;
        this.showOtpForRegister = true;

      }, err => {
        if (err.status === 400) {
          // this.msg = this.translate.instant("common.loginErrMsg");
          swal(err.message, " ", "error").then((value) => {

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
        device_type: "Desktop"
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
    this.loginService.forgot(inData).subscribe(response => {
      this.forData = response.json().result[0];
      if (response.json().status === "failure") {
        swal(JSON.stringify(response.json().message), " ", "error");
      } else {
        this.showForgotPassword = false;
        this.showRegistration = false
        this.showModal = true;
        this.showOpacity = true;
        this.showOtp = true;

      }
    }, err => {
      swal(err.message, "", "error")
    })
  }
  checkOtp(action) {
    var inData = {
      otp: (this.formData.otp),
      email: this.formData.forMobile
    }
    this.loginService.checkOtp(inData).subscribe(response => {
      swal("Otp verified successfully", "", "success");
      this.showOtp = false;
      if (action === 'forgotpswrd') {
        this.changepw = true;
      } else {
        this.changepw = false;
        swal("Registered succeessfully", "", "success");
        this.onCloseCancel();
        // this.clearFields();
        this.formData.otp = '';
      }
    }, err => {
      swal("Failed", "", "error")
    })
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
      swal("Password changed", "", "success");
      this.onCloseCancel()
    }, err => {
      swal(err.message, "", "error")
    })
  }
  //logout
  logout() {
    localStorage.removeItem("userData");
    localStorage.removeItem("userId");
    localStorage.removeItem("key");
    localStorage.removeItem("userName");
    swal("Successfully log out", '', "success");
    this.showProfile = false;
    this.showLogin = true;
    this.router.navigate(["/"]);
  }


  resendOtp() {
    var inData = {
      mobile: localStorage.getItem("mobile")
    }
    this.loginService.resendOtp(inData).subscribe(response => {
      swal("OTP sent successfully", '', "success");
    }, err => {
      swal(err.message, '', "error");
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latlocation = position.coords.latitude;
        this.lanLocation = position.coords.longitude;
        var inData = "key=" + 'AIzaSyAfJTVKnpLl0ULuuwDuix-9ANpyQhP6mfc' + "&latlng=" + this.latlocation + "," + this.lanLocation + "&sensor=" + 'true'
        this.loginService.getLocation(inData).subscribe(response => {
        })
      });
    }
  }

  getVillage() {
    var inData = {
      "wh_pincode": "560078",
    }
  }
  searchProducts() {
    var inData = {
      _id: this.id,
      _session: localStorage.session,
      count: "20",
      id_warehouse: localStorage.id_warehouse,
      lang: "eng",
      parent_warehouseid: localStorage.parent_warehouseid,
      search: "cream",
      start: "0"
    }
    this.loginService.searchProducts(inData).subscribe(response => {
      //  console.log(response.json());
    }, err => {
      console.log(err)
    })
  }
  postVillageName() {
    var inData = {
      wh_pincode: "560078"
    }
    this.loginService.postVillageName(inData).subscribe(response => {
      this.Village = response.json().result;
      localStorage.setItem('id_warehouse', JSON.stringify(response.json().result[0].id_warehouse));
      localStorage.setItem('parent_warehouseid', JSON.stringify(response.json().result[0].parent_warehouseid));
      console.log(this.Village);
    }, err => {
      console.log(err)
    })
  }
}
