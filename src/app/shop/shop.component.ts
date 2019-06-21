import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from '../products-data.service';
import { ProdApi } from '../prod-api';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  searchResults: ProdApi;
  allProducts: Array<object> = [];
  page = 1;
  pageSize = 9;
  idCat = 1;
  filterString: string;
  public isCollapsed: boolean[] = [];

  alert = (name: string) => {
    this.filterString = name;
  }
  public calcFunc = (collectionSize: number) => {
    if (this.filterString && !collectionSize) {
      return 10;
    } else {
      return 100;
    }
  }


  constructor(private ProductsDataService: ProductsDataService) {   }

  ngOnInit() {
    this.ProductsDataService.prodData().then( (response) => {
      this.searchResults = response;
      // populate favorites array
      const responseArray = [];
      responseArray.push(this.searchResults);
      responseArray[0].forEach(category => {
         category.subcategories.forEach(subcategory => {
          subcategory.items.forEach(item => {
           this.allProducts.push(item);
          });
       });
      });
}, (error) => {
  console.log('Error: ' + error.statusText);
});
}

}
