import { Component, OnInit } from '@angular/core';
import { CatListServices } from './services/catListService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CatListServices],
})
export class AppComponent implements OnInit {
  title = 'app';
  geolocationPosition;
  isTracking = false;
  currentLat;
  currentLong;
  marker;
  map;
  ngOnInit() {

  }


}
