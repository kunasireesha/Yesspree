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
  brandData = []
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
        "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse":JSON.parse(localStorage.id_warehouse),
        "lang":"en"
      }
      this.loginService.brands(inData).subscribe(response=> {
        this.brandData = response.json().product;
        console.log(this.brandData)
      },error=>{

      })
    } else if(this.type === 'search'){
      // {"_id":"45","_session":"4515323411085622_NAM","count":20,"id_warehouse":"2","lang":"en","parent_warehouseid":"1","search":"cream","start":0}
      var params2 = {
        "_id":this.id,
        "_session":localStorage.session,
        "brand":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse":JSON.parse(localStorage.id_warehouse),
        "lang":"en"
      }
      this.loginService.searchAll(params2).subscribe(response=> {
        console.log(response)
      },error=> {

      })
    }
    else if(this.type === 'category') {
      var params1 = {
        "_id":this.id,
        "_session":localStorage.session,
        "brand":this.target,
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse":JSON.parse(localStorage.id_warehouse),
        "lang":"en"
      }
      this.loginService.category(params1).subscribe(response=> {
        console.log(response)
        },error=> {
    
        })
    } else {
      var params = {
        "_id":this.id,
        "_session":localStorage.session,
        "brand":parseInt(this.target),
        "count":20,
        "start":0,
        "wh_pincode":"560078",
        "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
        "id_warehouse":JSON.parse(localStorage.id_warehouse),
        "lang":"en"
      }
      this.loginService.skuInfo(params).subscribe(response=> {
      console.log(response)
      },error=> {
        
      })
    }
  }

}
