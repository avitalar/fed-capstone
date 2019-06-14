import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ProductsDataService} from './products-data.service';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OwlModule } from 'ngx-owl-carousel';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OwlModule
  ],
  providers: [ProductsDataService,NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
