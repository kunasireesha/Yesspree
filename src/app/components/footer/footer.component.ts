import { CatListServices } from './../../services/catListService';
import { DataService } from './../../services/login/login';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { catList } from '../../services/catList';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  id;
  dashboardDatas;
  categoryDatas;
  selectedCat;
  categoryNames = [];
  showSubcat = false;
  constructor(
    private loginService: DataService,
    public catSer: CatListServices,
    public router: Router,
  ) {

  }

  ngOnInit() {
    this.dashboardData();
    if (localStorage.userName !== undefined || localStorage.userData !== undefined) {
      this.id = JSON.parse(localStorage.userId);

    } else {
      this.id = 0;
    }

  }

  dashboardData() {
    var inData = {
      _id: this.id,
      device_type: "desktop",
      _session: localStorage.session,
      lang: "en",
      parent_warehouseid: localStorage.parent_warehouseid,
      id_warehouse: localStorage.id_warehouse,
      pincode: "560075"
    }
    this.loginService.getDashboardData(inData).subscribe(response => {
      this.categoryNames = response.json().result.category;
      console.log(this.categoryNames);
    }, err => {
      console.log(err)
    })
  }
  showSubcategorie(id, name, index) {
    this.selectedCat = index;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
        name: name
      }
    }
    let categories: catList = {
      cat_Id: id
    };
    this.catSer.categories = categories;
    this.showSubcat = true;
    this.router.navigate(["/childcat"], navigationExtras);
    window.scrollTo(0, 0);
  }
}
