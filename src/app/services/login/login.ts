import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppSettings } from '../../config';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { PARAMETERS } from '../../../../node_modules/@angular/core/src/util/decorators';

@Injectable()
export class DataService {
    constructor(private http: Http, private _router: Router) { }
    msg;
    geourl = "https://maps.googleapis.com/maps/api/geocode/json";
    //checking url after login
    checkCredentials() {
        if (localStorage.getItem("userName") !== null) {
            this._router.navigate(['/sidemenu']);
        }
    }

    getInputParams(url) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
        });
        return this.http.get(AppSettings.baseUrl + url, { headers: headers });
    }

    postInputParams(params, url) {
        const headers = new Headers({
            'Content-Type': "application/JSON",

        });
        return this.http.post(AppSettings.baseUrl + url, params, { headers: headers });
    }
    postAuthorizationInputParams(params, url) {
        const headers = new Headers({
            // 'Content-Type': "application/JSON",
            'Authorization': localStorage.authkey
        });
        return this.http.post(AppSettings.baseUrl + url, params, { headers: headers });
    }

    //login
    login(params): Observable<any> {
        return this.postInputParams(params, 'customer/login');
    }

    //otp request
    requestOtp(phone): Observable<any> {
        console.log(phone)
        return this.postInputParams(phone, 'customer');
    }

    //registraton
    registration(params): Observable<any> {
        return this.postInputParams(params, 'customer');
    }
    forgot(email): Observable<any> {
        return this.postInputParams(email, 'customer/forgotpwd')
    }
    resendOtp(email): Observable<any> {
        return this.postInputParams(email, 'customer/resend_otp')
    }
    checkOtp(params): Observable<any> {
        return this.postInputParams(params, 'customer/otp');
    }


    //KEY
    myaccount(): Observable<any> {
        return this.postAuthorizationInputParams('', 'customer/details');
    }
    update(_id): Observable<any> {
        return this.postAuthorizationInputParams(_id, 'customer/update')
    }
    updatePw(params): Observable<any> {
        return this.postAuthorizationInputParams(params, 'customer/update')
    }
    myorders(type): Observable<any> {
        return this.postAuthorizationInputParams(type, 'customer/orders')
    }
    updateAdd(params): Observable<any> {
        return this.postAuthorizationInputParams(params, 'customer/address')
    }
    createAdd(params): Observable<any> {
        return this.postAuthorizationInputParams(params, 'customer/address')
    }
    getAdd(params): Observable<any> {
        return this.postAuthorizationInputParams(params, 'customer/address')
    }
    deleteAdd(params): Observable<any> {
        return this.postAuthorizationInputParams(params, 'customer/address')
    }
    getDashboardData(params): Observable<any> {
        return this.postInputParams(params, 'customer/dashboard')
    }
    getSubcat(params): Observable<any> {
        return this.postInputParams(params, 'category/childcategories')
    }

    getSubcatData(params): Observable<any> {
        return this.postInputParams(params, 'category/sub_category')
    }

    getSubSubCatData(params): Observable<any> {
        return this.postInputParams(params, 'category/sub_subcategory')
    }
    getLastCatData(params): Observable<any> {
        return this.postInputParams(params, 'category/last_category')
    }

    getProducts(params): Observable<any> {
        return this.postInputParams(params, 'item/product')
    }

    getCart(params): Observable<any> {
        return this.postInputParams(params, 'cart')
    }

    getLocation(params): Observable<any> {
        const headers = new Headers({
            // 'Content-Type': "application/JSON",
            'Authorization': localStorage.authkey
        });
        return this.http.get(this.geourl + '?' + params, { headers: headers })
            .map(response => {
                return response.json();
            })
            .catch(error => {
                return Observable.throw(error.json());
            });
    }


    aboutus(): Observable<any> {
        return this.getInputParams('customer/aboutus');
    }

    faqs(): Observable<any> {
        return this.getInputParams('customer/faq');
    }

    terms(): Observable<any> {
        return this.getInputParams('customer/aboutus/terms_condition');
    }

    privacypolicy(): Observable<any> {
        return this.getInputParams('customer/aboutus/privacy_policy');
    }

}