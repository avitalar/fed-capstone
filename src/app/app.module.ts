import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ProductsDataService} from './products-data.service';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OwlModule } from 'ngx-owl-carousel';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  { path: '',
    component: HomepageComponent
  },
  { path: 'shop',
    component: ShopComponent,
    data: {
      title: 'Shop page'
    }
  },
  { path: 'cart',
    component: CartComponent,
    data: {
      title: 'cart page'
    }
  },
  { path: '**', component: NotFoundComponentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CartComponent,
    ShopComponent,
    NotFoundComponentComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OwlModule,
    RouterModule.forRoot(
      appRoutes
    ),
    NgbModule
  ],
  providers: [ProductsDataService,NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
