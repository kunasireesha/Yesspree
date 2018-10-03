import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageZoomModule } from 'angular2-image-zoom';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DataService } from './services/login/login'
import Popper from 'popper.js';
import swal from 'sweetalert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, } from "angular-6-social-login";
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';

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


//services need to mention in providers

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Your-Facebook-app-id")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("Your-Google-Client-Id")
      }

    ]
  );
  return config;
}

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
    ProductdetailsComponent,
    MyAccountComponent,
    ContactComponent,
    StaticComponent,
    CategoriesComponent
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
    SocialLoginModule,
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
        component: ProductsComponent
      },
      {
        path: 'product_details',
        component: ProductdetailsComponent
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
        data: [{ page: 'wishlist' }]
      }


    ], { useHash: true })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [DataService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent],
  exports: [BrowserModule]
})
export class AppModule {
  constructor() {
    if (localStorage.session === undefined || localStorage.session === '' || localStorage.session === null) {
      this.randomkey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('session', this.randomkey)
    }
  }
  randomkey;
}
