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
import { ProductPageComponent } from './product-page/product-page.component';
import { SubcategoryFilterPipe } from './subcategory-filter.pipe';
import { PriceFilterPipe } from './price-filter.pipe';
import { FilterStockedPipe } from './filter-stocked.pipe';
import { OrderByPricePipe } from './order-by-price.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  /* rubric13 | The home page is accessible at http://localhost:8080/# */
  { path: '',
    component: HomepageComponent
  },
  /* rubric34 | The shopping page is accessible at http://localhost:8080/#/shopping */
  { path: 'shopping',
    component: ShopComponent,
    data: {
      title: 'Shop page'
    }
  },
  /* rubric46 | The product page is accessible at http://localhost:8080/#/product?name=productname */
  { path: 'product/:productName',
  component: ProductPageComponent,
  data: {
    title: 'Product page'
  }
  },
  /* rubric56 | The cart page is accessible at http://localhost:8080/#/cart */
  { path: 'cart',
    component: CartComponent,
    data: {
      title: 'cart page'
    }
  },
  /* rubric62 | The contact page is accessible at http://localhost:8080/#/contact */
  { path: 'contact',
    component: ContactComponent,
    data: {
      title: 'contact page'
    }
  },
   /* rubric64 | The about page is accessible at http://localhost:8080/#/about */
   { path: 'about',
   component: AboutComponent,
   data: {
     title: 'about page'
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
    NotFoundComponentComponent,
    ProductPageComponent,
    SubcategoryFilterPipe,
    PriceFilterPipe,
    FilterStockedPipe,
    OrderByPricePipe,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OwlModule,
    RouterModule.forRoot(
      appRoutes
    ),
    NgbModule,
    FormsModule
  ],
  providers: [ProductsDataService,NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
