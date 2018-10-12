import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/login/login';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  constructor(public loginService: DataService) { }
  contactData = [];
  userId;
  ngOnInit() {

    if (localStorage.userId === '' || localStorage.userId === undefined || localStorage.userId === null) {
      this.userId = 0;
    } else {
      this.userId = JSON.parse(localStorage.userId);
    }

    var inData = {
      _id: this.userId,
      device_type: "desktop",
      _session: localStorage.session,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      pincode: (localStorage.pincode === undefined) ? localStorage.pincode : localStorage.wh_pincode
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.contactData = response.json().contactus;
      console.log(this.contactData);
    }, err => {
      console.log(err)
    })
  }

}
