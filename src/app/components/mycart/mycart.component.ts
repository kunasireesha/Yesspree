import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  userName:string;
  id:string;
  checkout:string;
  constructor(public loginService: DataService,) { 
  }

  orders=[];
  data={}
  ngOnInit() {
    //   this.cartCheckout();
  }
  
}
