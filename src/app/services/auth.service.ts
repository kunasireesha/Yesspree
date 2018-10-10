import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../config';

@Injectable()
export class AuthServices {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private http: Http) {

    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.socialLogin(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }


  socialLogin(data) {
    var inData = {
      "first_name": data.providerData[0].displayName,
      "last_name": '',
      "email": data.providerData[0].email,
      "mobile": data.providerData[0].phoneNumber,
      "google_id": data.providerData[0].uid
    }
    this.http.post(AppSettings.baseUrl + 'customer/social', inData).subscribe(response => {
      localStorage.setItem('userId', JSON.stringify(response.json().result[0]._id));
      localStorage.setItem('userName', JSON.stringify(response.json().result[0].first_name + ' ' + response.json().result[0].last_name));
      localStorage.setItem('authkey', response.json().key);
      localStorage.setItem('userData', JSON.stringify(response.json().result[0]));
      localStorage.setItem("userMobile", response.json().result[0].mobile);
      localStorage.setItem('issocial', 'true');
    });
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}

