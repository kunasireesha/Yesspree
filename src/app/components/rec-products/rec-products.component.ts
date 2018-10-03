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
  id;
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params=>{
      this.type = params.action
    })
   }
   typeOfProduct;
  ngOnInit() {
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      
      this.id = 0;
    }
   if(this.type = 'recProducts'){
     this.typeOfProduct="specific_product1"
   }else if(this.type = 'recProducts1'){
    this.typeOfProduct="specific_product2"
   } else {
    this.typeOfProduct="brands"
   }
     var inData = {
      "_id":this.id,
      "_session":localStorage.session,
      "count":20,
      "id_warehouse":JSON.parse(localStorage.id_warehouse),
      "lang":"en",
      "parent_warehouseid":JSON.parse(localStorage.parent_warehouseid),
      "start":0,
      "type":this.typeOfProduct
    }
    this.loginService.recProducts(inData).subscribe(response=> {
console.log(response)
    },error=> {

    })
     }
   
  

}
