import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../../config';

@Component({
  selector: 'app-rec-products',
  templateUrl: './rec-products.component.html',
  styleUrls: ['./rec-products.component.css','../products/products.component.less','../home/home.component.less']
})
export class RecProductsComponent implements OnInit {
  type;
  id;
  products;
  brands;
  url;
  showbrands = false;
  showproducts =false;
  noData=false;
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params=>{
      this.type = params.action
    })
   }
   typeOfProduct;
  ngOnInit() {
    this.url = AppSettings.imageUrl;
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);
    } else {
      
      this.id = 0;
    }
   if(this.type === 'recProducts'){
     this.typeOfProduct="specific_product1"
     this.showbrands = true;
     this.showbrands = false;
   }else if(this.type === 'recProducts1'){
    this.typeOfProduct==="specific_product2"
    this.showbrands = true;
     this.showbrands = false;
   } else {
     this.noData = false;
     this.showbrands = true;
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
      this.products = response.json().product;
      this.brands = response.json().brands;
  //  if( this.products == 0 ||   null || undefined){
  //   this.showproducts = false; 
  //   this.noData = true;
  //   this.showbrands = false;
  //  } else {
  //   this.products = response.json().product;
  //   this.showbrands = false;
  //   this.showproducts = true;
  //   this.noData = false;
  //  }  
    // this.showbrands = true;
    // this.showproducts = false;
    // this.noData = false;
    console.log(this.brands)
   
    },error=> {
console.log(error)
    })
     }
   
  

}
