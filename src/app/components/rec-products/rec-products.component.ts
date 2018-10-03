import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-rec-products',
  templateUrl: './rec-products.component.html',
  styleUrls: ['./rec-products.component.css','../products/products.component.less']
})
export class RecProductsComponent implements OnInit {
  type;
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params=>{
      this.type = params.action
    })
   }

  ngOnInit() {
   if(this.type = 'recProducts'){
     var inData = {
      "_id":"45",
      "_session":localStorage.session,
      "count":20,
      "id_warehouse":localStorage.id_warehouse,
      "lang":"en",
      "parent_warehouseid":localStorage.parent_warehouseid,
      "start":0,
      "type":this.type
    }
    this.loginService.recProducts(inData).subscribe(response=> {
console.log(response)
    },error=> {

    })
     }
   }
  

}
