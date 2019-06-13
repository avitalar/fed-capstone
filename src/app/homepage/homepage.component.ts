import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from '../products-data.service';
import { ProdApi } from '../prod-api';
import { element } from 'protractor';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  searchResults: ProdApi;
  favorites: Array<object> = [];
  favoriteItems: Array<object> = [];
  featuredItem: Array<object> = [];
  element: Array<object> = [];
  imgObject: object;

// tslint:disable-next-line: no-shadowed-variable
  constructor(private ProductsDataService: ProductsDataService) {   }

  ngOnInit() {

    this.ProductsDataService.prodData().then( (response) => {
      this.searchResults = response;
      // populate favorites array
      const allProducts = [];
      const responseArray = [];
      responseArray.push(this.searchResults);
      responseArray[0].forEach(category => {
         category.subcategories.forEach(subcategory => {
          subcategory.items.forEach(item => {
           allProducts.push(item);
          });
       });
      });

      // for featured carousel - choose all products that are top rated and their price is lower than 3$
      allProducts.forEach(el => {
        if ((el.rating >= 5) && (el.price < 3) && (el.name !== 'Popcorn')) {
        this.featuredItem.push(el);
        }
      });

    }, (error) => {
      console.log('Error: ' + error.statusText);
    });
  }

//   dosomething = ($event) => {
//     const loadadimages = [];
//     loadadimages.push($event);
//     $($event.currentTarget).closest('.featuredImgWrapper').hover(function(){
//       $(this).find('.overlay').toggleClass('visible');
//   });
// }
}
