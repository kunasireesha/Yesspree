import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/login/login';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public loginService: DataService, ) {
    this.route.queryParams.subscribe(params => {
      this.subCatId = params.id;
      this.subName = params.name;
    });
  }

  ngOnInit() {
    //get subcat data
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId)
    } else {
      this.id = ''
    }

    var inData = {
      _id: this.id,
      id_category: this.subCatId,
      _session: localStorage.session,
      pincode: "560075",
      "parent_warehouseid": "1",
      "id_warehouse": "2",
      "lang": "en"
    }
    this.loginService.getSubcatData(inData).subscribe(response => {
      this.subcatdata = response.json().result.sub_category;

    }, err => {
      console.log(err)
    })
  }


  showCategories = false;
  showSubCategories = false;
  showInput = false;
  showInput1 = false;
  subCatId;
  id;
  subName;
  subcatdata = [];
  subSubCatData = [];
  lastCatData = [];
  selectedCat;
  selectedLastCat;

  //sub sub categories
  showsubSubCat(index, subId) {
    this.selectedCat = index;
    this.showCategories = true;
    var inData = {
      _id: this.id,
      id_category: subId,
      _session: localStorage.session,
      pincode: "560075",
      "parent_warehouseid": JSON.parse(localStorage.parent_warehouseid),
      "id_warehouse": JSON.parse(localStorage.id_warehouse),
      "lang": "en"
    }
    this.loginService.getSubSubCatData(inData).subscribe(response => {
      this.subSubCatData = response.json().result.sub_category;
    }, err => {
      console.log(err)
    })
  }
  closesubSubCat() {
    this.showCategories = false;
    this.showSubCategories = false;
  }
  //end sub sub categories

  //last categories
  showLastCat(index, lastId) {
    this.selectedLastCat = index;
    this.showSubCategories = true;
    var inData = {
      _id: this.id,
      id_category: lastId,
      _session: localStorage.session,
      pincode: "560075",
      "parent_warehouseid": "1",
      "id_warehouse": "2",
      "lang": "en"
    }
    this.loginService.getLastCatData(inData).subscribe(response => {
      this.lastCatData = response.json().result.category;
    }, err => {
      console.log(err)
    })
  }
  closeLastCat() {
    this.showSubCategories = false;
  }
  //end last categories


  showCateProd(id) {
    this.getProducts(id);
  }
  getSubcatProd(id) {
    this.getProducts(id);
  }

  getLastProd(id) {
    this.getProducts(id);
  }

  //get products
  getProducts(id) {
    var inData = {
      _id: this.id,
      id_subcategory: id,
      _session: localStorage.session,
      wh_pincode: "560078",
      parent_warehouseid: "1",
      id_warehouse: "2",
      lang: "en",
    }
    this.loginService.getProducts(inData).subscribe(response => {
      this.subSubCatData = response.json().result.sub_category;
    }, err => {
      console.log(err)
    })
  }

  showInputValue() {
    this.showInput = true;
  }

  showInputValue1() {
    this.showInput1 = true;
  }

  showProduxtDetails() {
    this.router.navigate(["/product_details"]);
  }

}
