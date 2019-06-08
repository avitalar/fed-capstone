import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from '../products-data.service';
import { ProdApi } from '../prod-api';
import { element } from 'protractor';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchResults: ProdApi;
  favorites: Array<object> = [];
  favoriteItems: Array<object> = [];
  featuredItem: Array<object> = [];
  element: Array<object> = [];

// tslint:disable-next-line: no-shadowed-variable
  constructor(private ProductsDataService: ProductsDataService) { }

  ngOnInit() {
    this.ProductsDataService.prodData().then( (response) => {
      this.searchResults = response;
      // populate favorites array
      const allProducts = [];
      response.forEach(category => {
        category.subcategories.forEach(subcategory => {
          subcategory.items.forEach(item => {
            allProducts.push(item);
          });
        });
      });
      console.log(allProducts.length);

      // for featured carousel - choose all products that are top rated and their price is lower than 3$
      allProducts.forEach(el => {
        if ((el.rating >= 5) && (el.price < 3)) {
        this.featuredItem.push(el);
        }
      });

    }, (error) => {
      console.log('Error: ' + error.statusText);
    });
  }

}
