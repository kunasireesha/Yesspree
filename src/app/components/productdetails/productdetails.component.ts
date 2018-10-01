import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.less']
})
export class ProductdetailsComponent implements OnInit {
  id;
  constructor(private router: Router, public loginService: DataService) {
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
        products:"12",
        parent_warehouseid:"1",
        id_warehouse:"2",
        lang:"en",
    }
    this.loginService.productDetails(inData).subscribe(response => {
    //  console.log(response.json());
    }, err => {
      console.log(err)
    })
  }
}
