import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material';
import { NgModule, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageZoomModule } from 'angular2-image-zoom';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DataService } from './services/login/login'
import Popper from 'popper.js';
import swal from 'sweetalert';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FacebookModule } from 'ngx-facebook';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, } from "angular-6-social-login";
import { TruncatePipe } from './limitto';
// import { SlickModule } from 'ngx-slick';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ContactComponent } from './components/contact/contact.component';
import { StaticComponent } from './components/static/static.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RecProductsComponent } from './components/rec-products/rec-products.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { BannerNavigationComponent } from './components/banner-navigation/banner-navigation.component';

import { HeadercartComponent } from './components/headercart/headercart.component';
// directive
import { NumberOnlyDirective } from './directives/number';
import { AlphabetsOnly, EmailOnly } from './directives/number';
import { AlphaNumericOnly } from './directives/number';
import { AuthServices } from './services/auth.service';
import { MyComponentOrService } from './services/facebook';



//services need to mention in providers

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("211463156112817")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("849103706717-1kn7e8mhmb7cc4hudstp0e6bs0alqtsu.apps.googleusercontent.com 	")
      }

    ]
  );
  return config;
}

var firebaseConfig = {
  apiKey: "AIzaSyDuESqaJ9e1KykYB7QYo_8gF1CI-YgCNcE",
  authDomain: "yesspree-d146f.firebaseapp.com",
  databaseURL: "https://yesspree-d146f.firebaseio.com",
  projectId: "yesspree-d146f",
  storageBucket: "yesspree-d146f.appspot.com",
  messagingSenderId: "849103706717"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ProductComponent,
    MycartComponent,
    OrderSummaryComponent,
    MyAccountComponent,
    ContactComponent,
    StaticComponent,
    RecProductsComponent,
    SearchProductComponent,
    CategoriesComponent,
    RecProductsComponent,
    BannerNavigationComponent,
    NumberOnlyDirective,
    AlphaNumericOnly,
    AlphabetsOnly,
    EmailOnly,
    TruncatePipe,
    HeadercartComponent

  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    RouterModule,
    ImageZoomModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FacebookModule.forRoot(),
    NgbModule,
    // SlickModule.forRoot(),
    Ng2CarouselamosModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        data: [{ page: 'home' }]
      },
      {
        path: 'childcat',
        component: CategoriesComponent
      },
      {
        path: 'mycart',
        component: MycartComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'orderSummary',
        component: OrderSummaryComponent
      },

      {
        path: 'products',
        component: ProductsComponent,
        data: [{ page: 'items' }]
      },
      {
        path: 'recProducts',
        component: RecProductsComponent
      },
      {
        path: 'product_details',
        component: ProductsComponent,
        data: [{ page: 'details' }]
      },
      {
        path: 'myaccount',
        component: MyAccountComponent,
        data: [{ page: 'account' }]
      },
      {
        path: 'deliveryaddress',
        component: MyAccountComponent,
        data: [{ page: 'address' }]
      },
      {
        path: 'ordersfirst',
        component: MyAccountComponent,
        data: [{ page: 'orders1' }]
      },
      {
        path: 'orderssecond',
        component: MyAccountComponent,
        data: [{ page: 'address2' }]
      },
      {
        path: 'myAccountcart',
        component: MyAccountComponent,
        data: [{ page: 'cart' }]
      },
      {
        path: 'mysubscription',
        component: MyAccountComponent,
        data: [{ page: 'subscription' }]
      },
      {
        path: 'myoffers',
        component: MyAccountComponent,
        data: [{ page: 'offers' }]
      },
      {
        path: 'myrateus',
        component: MyAccountComponent,
        data: [{ page: 'rateus' }]
      },
      {
        path: 'mynotifiactions',
        component: MyAccountComponent,
        data: [{ page: 'notifications' }]
      },
      {
        path: 'share',
        component: MyAccountComponent,
        data: [{ page: 'share' }]
      },
      {
        path: 'about',
        component: StaticComponent,
        data: [{ page: 'about' }]
      },
      {
        path: 'faq',
        component: StaticComponent,
        data: [{ page: 'faq' }]
      },
      {
        path: 'privacy',
        component: StaticComponent,
        data: [{ page: 'privacypolicy' }]
      },
      {
        path: 'terms',
        component: StaticComponent,
        data: [{ page: 'termsandcond' }]
      },
      {
        path: 'wishlist',
        component: MyAccountComponent,
        data: [{ page: 'wishlistpage' }]
      },
      {
        path: 'coupon',
        component: MyAccountComponent,
        data: [{ page: 'coupon' }]
      },
      {
        path: 'searchProduct',
        component: SearchProductComponent,
      }, {

        path: 'myCartDetails',
        component: MyAccountComponent,
        data: [{ page: 'myCartDetails' }]
      },
      {
        path: 'searchProduct',
        component: SearchProductComponent,
      },
      {
        path: 'banner_navigation',
        component: BannerNavigationComponent,
      }


    ], { useHash: true })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [DataService, AuthServices, MyComponentOrService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent],
  exports: [BrowserModule]
})
export class AppModule {
  constructor(public loginService: DataService) {
    // if (localStorage.session === undefined || localStorage.session === '' || localStorage.session === null) {
    //   this.randomkey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    //   localStorage.setItem('session', this.randomkey)
    // }
  }
  // randomkey;
}


