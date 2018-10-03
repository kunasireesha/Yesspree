import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/login/login';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  id;
  ngOnInit() {
    this.getAdd();
    localStorage.getItem;
  }

  public itemsList: Object[] = [
    {
      title: 'Collapsible Group Item #1',
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    },
    {
      title: 'Collapsible Group Item #2',
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    },
    {
      title: 'Collapsible Group Item #3',
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    }
  ]
  pageNav: string;
  myaccountData = false;
  deliveryAddress = false;
  myOrders1 = false;
  myOrders2 = false;
  mycart = false;
  mysubscription = false;
  offers = false;
  rateUs = false;
  mynotifiactions = false;
  sharescreen = false;
  getAddress;
  editData;
  orders;
  notificationList;
  createdData = []
  mydata = {
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  type;
  addData = {
    name: '',
    phone: '',
    address1: '',
    taluk: '',
    district: '',
    state: '',
    pincode: ''
  }


  constructor(private route: ActivatedRoute, public router: Router, public loginService: DataService) {
    this.pageNav = this.route.snapshot.data[0]['page'];
    if (this.pageNav === "account") {
      this.myaccountData = true;
      this.loginService.myaccount().subscribe(response => {
        this.mydata = response.json().result[0];
        localStorage.setItem('userData', JSON.stringify(response.json().result));
      }, err => {

      })
    } else if (this.pageNav === "address") {
      this.deliveryAddress = true;
    } else if (this.pageNav === "orders1") {
      this.myOrders1 = true;
    } else if (this.pageNav === "address2") {
      this.myOrders2 = true;
    } else if (this.pageNav === "cart") {
      this.mycart = true;
    } else if (this.pageNav === "subscription") {
      this.mysubscription = true;
    } else if (this.pageNav === "offers") {
      this.offers = true;
    } else if (this.pageNav === "rateus") {
      this.rateUs = true;
    } else if (this.pageNav === "notifications") {
      this.id = JSON.parse(localStorage.userId);
      this.mynotifiactions = true;
      var inData =  {
        "id_customer":this.id ,
        "parent_warehouseid":"1",
        "id_warehouse":"2",
        "lang":"en"
      }
      this.loginService.notificationsData(inData).subscribe(response=> {
      this.notificationList = response.json();
      console.log( this.notificationList)
      },error=>{
  
      })
    } else if (this.pageNav === "share") {
      this.sharescreen = true;
    }
  }

  myaccount() {

    this.myaccountData = true;
    this.deliveryAddress = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.router.navigate(['/myaccount']);
  }

  myaddress() {
    this.deliveryAddress = true;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.router.navigate(['/deliveryaddress']);
  }

  myorders() {
    var inData = {
      type: 'Present'
    }
    this.loginService.myorders(inData).subscribe(response => {
      this.orders = response.json()
    }, err => {
      console.log(err)
    })
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = true;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.router.navigate(['/ordersfirst']);
  }

  mycartData() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = true;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.router.navigate(['/myAccountcart']);
  }
  mysubscriptionData() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = true;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.router.navigate(['/mysubscription']);
  }

  myoffers() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = true;
    this.rateUs = false;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.router.navigate(['/myoffers']);
  }

  rateus() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = true;
    this.mynotifiactions = false;
    this.sharescreen = false;
    this.router.navigate(['/myrateus']);

  }

  notificationsData() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.mynotifiactions = true;
    this.router.navigate(['/mynotifiactions']);
    this.sharescreen = false;
  }

  showOrderItems() {
    this.myOrders2 = true;
    this.myOrders1 = false;
  }

  share() {
    this.deliveryAddress = false;
    this.myaccountData = false;
    this.myOrders1 = false;
    this.myOrders2 = false;
    this.mycart = false;
    this.mysubscription = false;
    this.offers = false;
    this.rateUs = false;
    this.sharescreen = true;
    this.mynotifiactions = false;
    this.router.navigate(['/share']);
  }

  update() {
    var inData = {
      _id: JSON.parse(localStorage.userId),
      first_name: this.mydata.first_name,
      last_name: this.mydata.last_name,
      email: this.mydata.email,
      mobile: this.mydata.mobile

    }
    console.log(JSON.parse(localStorage.userId))
    this.loginService.update(inData).subscribe(response => {
      swal("Updated successfully", '', "success");
      localStorage.removeItem("userName");
      localStorage.setItem("userName", JSON.stringify(response.json().result[0].first_name + ' ' + response.json().result[0].last_name));
      localStorage.removeItem("userMobile");
      localStorage.setItem("userMobile",response.json().result[0].mobile);
    }, err => {
      swal(err.msg, '', "error")
    })
  }



  //for address type
  buttonType(type) {
    this.type = type;
  }

  //create address
  createAdd() {
    var inData = {
      op: "create",
      pincode: this.addData.pincode,
      id_customer: localStorage.userId,
      name: this.addData.name,
      phone: JSON.parse(localStorage.userData).mobile,
      address1: this.addData.address1,
      city: "hyd",
      state: this.addData.state,
      person_prefix: JSON.parse(localStorage.userData).person_prefix,
      taluk: this.addData.taluk,
      district: this.addData.district,
      lat: "5550",
      lon: "123",
      landmark: "hyd",
      selected: true,
      type: this.type,
      country: "India"

    }
    this.loginService.createAdd(inData).subscribe(response => {
      swal("Created successfully", "", "success");
      this.getAdd();
      this.clearData();
    }, err => {

    })
  }
  // clear input fields
  clearData() {
    this.addData = {
      name: '',
      phone: '',
      address1: '',
      taluk: '',
      district: '',
      state: '',
      pincode: '',
    }
  }


  //get address
  getAdd() {
    var inData = {
      op: "get"
    }
    this.loginService.getAdd(inData).subscribe(response => {
      this.getAddress = response.json().result
    }, err => {
      swal(err.message, "", "error")
    })
  }

  //delete address
  deleteAdd(id) {
    var inData = {
      op: "delete",
      id_address: id
    }

    swal("Do you want to delete?", "", "warning", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {

      if (value === true) {
        this.loginService.deleteAdd(inData).subscribe(response => {
          swal("Deleted successfully", "", "success");
          this.getAdd();
        }, err => {
          swal(err.message, "", "error")
        })
      } else {
        return;
      }
    });
  }

  //edit address
  editAdd(item) {
    this.editData = item;
    for (var i = 0; i < this.getAddress.length; i++) {
      if (item._id === this.getAddress[i]._id) {
        this.addData = {
          name: this.getAddress[i].name,
          phone: this.getAddress[i].phone,
          address1: this.getAddress[i].address1,
          taluk: this.getAddress[i].taluk,
          district: this.getAddress[i].district,
          state: this.getAddress[i].state,
          pincode: this.getAddress[i].pincode,
        }
      }
    }
  }

  //update address    
  updateAdd() {
    var inData = {
      op: "update",
      id_address: this.editData._id,
      id_customer: this.editData.id_customer,
      name: this.addData.name,
      phone: this.addData.phone,
      address1: this.addData.address1,
      city: this.editData.city,
      state: this.addData.state,
      person_prefix: this.editData.person_prefix,
      taluk: this.addData.taluk,
      district: this.addData.district,
      lat: this.editData.lat,
      lon: this.editData.lon,
      landmark: this.editData.landmark,
      selected: this.editData.selected,
      type: this.type,
      pincode: this.addData.pincode
    }

    this.loginService.updateAdd(inData).subscribe(response => {
      this.getAdd();
      swal("Updated successfully", "", "success");
    }, err => {
      swal(err.message, "", "error");
    })
  }
}
