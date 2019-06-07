import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from '../products-data.service';
import { ProdApi } from '../prod-api';


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



// tslint:disable-next-line: max-line-length
      this.featuredItem = [response[1].subcategories[0].items[0], response[1].subcategories[1].items[0], response[0].subcategories[2].items[1], response[1].subcategories[2].items[3], response[0].subcategories[1].items[1], response[0].subcategories[2].items[2], response[0].subcategories[1].items[1], response[0].subcategories[1].items[2], response[2].subcategories[1].items[2], response[2].subcategories[1].items[2], response[3].subcategories[1].items[1], response[0].subcategories[1].items[2]];
      let i = 0;
      this.featuredItem.forEach(element => {
        i++;
        if (element != null) {
          if (this.favoriteItems.indexOf(element) < 0) { // check if already exist in array to prevent duplicates
            this.favoriteItems.push(element);
          }
      } else {
      }
      });
    }, (error) => {
      console.log('Error: ' + error.statusText);
    });
  }

}
