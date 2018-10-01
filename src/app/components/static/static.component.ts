import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/login/login';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {

  constructor(
    public router: Router,
    public loginSer: DataService,
    private route: ActivatedRoute) {
    this.pageNav = this.route.snapshot.data[0]['page'];
    if (this.pageNav === 'about') {
      this.showabout = true;
      this.loginSer.aboutus().subscribe(response => {
        this.responseData = response.json().result.aboutus[0];
      });
    } else if (this.pageNav === 'faq') {
      this.showFaq = true;
      this.loginSer.faqs().subscribe(response => {
        this.responseData = response.json().result;
      });
    } else if (this.pageNav === 'privacy') {
      this.showPrivacy = true;
      this.loginSer.terms().subscribe(response => {
        this.responseData = response.json().result.privacy_policy[0];
      });
    } else if (this.pageNav === 'terms') {
      this.showTerms = true;
      this.loginSer.terms().subscribe(response => {
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

