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
  subcategoriesArray: Array<object> = [];
  // pricesFilterArray: Array<array> = [];
  pricesFilterArray = [{'min':'1','max':'50'},{'min':'51','max':'100'},{'min':'101','max':'200'}]
  public isCollapsed: boolean[] = [];

  subcategoryFilterFunc = (name: string) => {
    console.log(this.subcategoriesArray);
    this.filterString = name;
    this.subcategoriesArray.forEach(el => {
      // console.log('name: ' + el[0] + 'length: ' + el[1]);
      if (el[0] === name && el[1] > 0) {
        console.log('here');
        this.calcFunc(el[1]);
      } else if (el[1] === 0) {
        console.log('not here: ' + el[1]);
        console.log(this.allProducts.length);
        this.calcFunc(this.allProducts.length);
      }
    });
    this.filterString = name;
  }
  calcFunc = (collectionSize: number) => {
    if (this.filterString && !collectionSize) {
      return collectionSize;
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
           if (subcategory.items.length > 0) {
          this.subcategoriesArray.push([subcategory.name,subcategory.items.length]);
        }
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
