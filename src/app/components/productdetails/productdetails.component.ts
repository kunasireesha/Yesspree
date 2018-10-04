import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.less']
})
export class ProductdetailsComponent implements OnInit {
  id;
  prodId;
  product;
  constructor(private route: ActivatedRoute, public router: Router, public loginService: DataService) {
    this.route.queryParams.subscribe(params => {
      this.prodId = params.proId;
    });
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
        this.id = JSON.parse(localStorage.userId);
      }  else {
        this.id = ''
      }
   }

  ngOnInit() {
    this.productDetails();
    
  }
  showSubscriptionData = false;
  showCategories = true;
  showSubCategories = true;
  data = '';
  email = '';
  showInput = false;
  showInput1 = false;

  showSubscribeDetails() {
    this.showSubscriptionData = !this.showSubscriptionData;
  }

  submit() {
    console.log(this.data + '   ' + this.email);
  }

  showProduxtDetails() {
    this.router.navigate(["/product_details"]);
  }

  collapse() {
    this.showCategories = !this.showCategories;

  }


  showInputValue() {
    this.showInput = true;
  }

  showInputValue1() {
    this.showInput1 = true;
  }

  productDetails() {
      var inData = {
        _id: this.id,
        _session: localStorage.session,
        products:this.prodId ,
        parent_warehouseid:JSON.parse(localStorage.parent_warehouseid),
        id_warehouse:JSON.parse(localStorage.id_warehouse),
        lang:"en",
    }
    this.loginService.productDetails(inData).subscribe(response => {
    this.product = response.json().product.pic[0];
    }, err => {
      console.log(err);
    })
  }
}
  