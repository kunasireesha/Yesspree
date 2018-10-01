import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orderSu: boolean = true;
  deliveryA: boolean = false;
  deliveryOp: boolean = false;
  paymentM: boolean = false;
  constructor() { }
  order() {
    this.orderSu = true;
    this.deliveryA = this.deliveryOp = this.paymentM = false
  }
  delAdd() {
    this.deliveryA = true;
    this.orderSu = this.deliveryOp = this.paymentM = false
  }
  delOpt() {
    this.deliveryOp = true;
    this.orderSu = this.deliveryA = this.paymentM = false
  }
  paymentMethod() {
    this.paymentM = true;
    this.orderSu = this.deliveryOp = this.deliveryA = false
  }
  ngOnInit() {
  }

}
