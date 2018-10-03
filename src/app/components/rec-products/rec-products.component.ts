import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-rec-products',
  templateUrl: './rec-products.component.html',
  styleUrls: ['./rec-products.component.css', '../products/products.component.less']
})
export class RecProductsComponent implements OnInit {
  type;
  constructor(public loginService: DataService, private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.type = params.action;
      this.catId = params.catId
    })
  }
  typeOfProduct;
  catId;
  subCatId;
  ngOnInit() {
    if (this.type = 'recProducts') {
      this.typeOfProduct = "specific_product1";
      this.subCatId = '';
    } else if (this.type = 'recProducts1') {
      this.typeOfProduct = "specific_product1";
      this.subCatId = '';
    } else if (this.type = 'topProducts') {
      this.typeOfProduct = "top_products";
      this.subCatId = this.catId;
    } else if (this.type = 'allProducts') {
      this.typeOfProduct = "all_products";
      this.subCatId = this.catId;
    }

    var inData = {
      "_id": "45",
      "_session": localStorage.session,
      "count": 20,
      "id_warehouse": JSON.parse(localStorage.id_warehouse),
      "lang": "en",
      "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
      "start": 0,
      "type": this.typeOfProduct,
      "id_subcategory": this.catId
    }
    this.loginService.recProducts(inData).subscribe(response => {
      console.log(response)
    }, error => {

    })
  }





}
