import { DataService } from './../services/login/login';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
    // userName;
    id;
    event;
    count;
  constructor(private loginService:DataService,private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params=> {
        this.event = params.event,
        this.count = params.count
    })
   }

  ngOnInit() {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
        this.id = JSON.parse(localStorage.userId)
      } else {
        this.id = ''
      }
  }
  searchProducts(){
    var inData = {
        _id: this.id,
        _session: localStorage.session,
        count:this.count,
        id_warehouse:JSON.parse(localStorage.id_warehouse),
        lang:"en",
        parent_warehouseid:JSON.parse(localStorage.parent_warehouseid),
        search:this.event,
        start:0
    }
    this.loginService.searchProducts(inData).subscribe(response => {
     
    }, err => {
      console.log(err)
    })
  }
}
