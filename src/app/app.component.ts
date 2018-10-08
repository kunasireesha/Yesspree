import { Component, OnInit } from '@angular/core';
import { CatListServices } from './services/catListService';
import { DataService } from './services/login/login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CatListServices, DataService],
})
export class AppComponent implements OnInit {
  title = 'app';
  geolocationPosition;
  isTracking = false;
  currentLat;
  currentLong;
  marker;
  map;
  randomkey;
  ngOnInit() {
    this.postVillageName();
    if (localStorage.session === undefined || localStorage.session === '' || localStorage.session === null) {
      this.randomkey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('session', this.randomkey)
    }
  }

  constructor(
    public loginService: DataService,
    public catSer: CatListServices
  ) {

  }
  Village = [];

  postVillageName() {
    var inData = {
      wh_pincode: "560078"
    }
    this.loginService.postVillageName(inData).subscribe(response => {
      this.Village = response.json().result;
      localStorage.setItem('id_warehouse', response.json().result[0].id_warehouse);
      localStorage.setItem('parent_warehouseid', response.json().result[0].parent_warehouseid);
    }, err => {
      console.log(err)
    })
  }


}
