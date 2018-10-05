import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';


@Component({
  selector: 'app-banner-navigation',
  templateUrl: './banner-navigation.component.html',
  styleUrls: ['./banner-navigation.component.css']
})
export class BannerNavigationComponent implements OnInit {
  type;
  target;
  url;
  id;
  constructor(public loginService:DataService, private route: ActivatedRoute, public router: Router ) {
    this.route.queryParams.subscribe(params=> {
      this.type =params.type
      this.target = params.target
    })
   }

  ngOnInit() {
    this.url = AppSettings.imageUrl;
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      this.id = 0;
    }
    if(this.type === 'brand'){
       var inData = {
        "_id":this.id,
        "_session":localStorage.session,
        "brand":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        parent_warehouseid:JSON.parse(localStorage.parent_warehouseid)
      }
      this.loginService.brands(inData).subscribe(response=> {
        console.log(response)
      },error=>{

      })
    } else if(this.type === 'search'){
      var inData = {
        "_id":this.id,
        "_session":localStorage.session,
        "brand":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        parent_warehouseid:JSON.parse(localStorage.parent_warehouseid)
      }
      this.loginService.searchAll(inData).subscribe(response=> {
        console.log(response)
      },error=> {

      })
    }
    else if(this.type === 'category') {
      var inData = {
        "_id":this.id,
        "_session":localStorage.session,
        "brand":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        parent_warehouseid:JSON.parse(localStorage.parent_warehouseid)
      }
      this.loginService.category(inData).subscribe(response=> {
        console.log(response)
        },error=> {
    
        })
    } else {
      var inData = {
        "_id":this.id,
        "_session":localStorage.session,
        "brand":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        parent_warehouseid:JSON.parse(localStorage.parent_warehouseid)
      }
      this.loginService.skuInfo(inData).subscribe(response=> {
      console.log(response)
      },error=> {
        
      })
    }
  }

}
