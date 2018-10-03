import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/login/login';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {

  abtPdf;
  constructor(
    public router: Router,
    public loginSer: DataService,
    private route: ActivatedRoute) {
    this.pageNav = this.route.snapshot.data[0]['page'];
    if (this.pageNav === 'about') {
      this.showabout = true;
      var inData = {"lang":"en"}
      this.loginSer.aboutus(inData).subscribe(response => {
        this.responseData = response.json().result.aboutus[0];
        this.abtPdf = response.json().result.aboutus[0].name;
      });
    } else if (this.pageNav === 'faq') {
      this.showFaq = true;
      var inData = {"lang":"en"}
      this.loginSer.faq(inData).subscribe(response => {
        this.responseData = response.json().result;
      });
    } else if (this.pageNav === 'privacypolicy') {
      this.showPrivacy = true;
      var inData = {"lang":"en"}
      this.loginSer.aboutus(inData).subscribe(response => {
        this.responseData = response.json().result.privacy_policy[0];
      });
    } else if (this.pageNav === 'termsandcond') {
      this.showTerms = true;
      var inData = {"lang":"en"}
      this.loginSer.aboutus(inData).subscribe(response => {
        this.responseData = response.json().result.terms_condition[0];
      });
    }
  }

  responseData = [];
  pageNav;
  showabout = false;
  showFaq = false;
  showPrivacy = false;
  showTerms = false;
  ngOnInit() {
  }

}

