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
    // this.postVillageName();
    if (localStorage.session === undefined || localStorage.session === '' || localStorage.session === null) {
      this.randomkey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('session', this.randomkey)
    }

    localStorage.setItem('id_warehouse', "2");
    localStorage.setItem('parent_warehouseid', "1");
    localStorage.setItem('wh_pincode', '560078');
  }

  constructor(
    public loginService: DataService,
    public catSer: CatListServices
  ) {

  }
  Village = [];

  // postVillageName() {

  // }


}
