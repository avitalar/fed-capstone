import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ProductsDataService} from './products-data.service';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OwlModule } from 'ngx-owl-carousel';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OwlModule
  ],
  providers: [ProductsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
