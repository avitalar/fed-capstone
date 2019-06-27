import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from '../products-data.service';
import { ProdApi } from '../prod-api';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
// tslint:disable-next-line: no-shadowed-variable
  constructor(private ProductsDataService: ProductsDataService) {   }
  searchResults: ProdApi;
  allProducts: Array<object> = [];
  page = 1;
  pageSize = 9;
  idCat = 1;
  filterString: string;
  filterPrice: string;
  subcategoriesArray: Array<object> = [];
// tslint:disable-next-line: max-line-length
  pricesFiltreArray: Array<object> = [];
  public isCollapsed: boolean[] = [];
  orderByPriceBool = false;
  filterBool = {byStock: false, isByPrice: this.orderByPriceBool};


  filterPriceFunc(searchValue: string, event ) {
    const childrenArr = event.target.parentElement.children;
    for (const entry of childrenArr) {
      entry.className = '';
    }
    event.target.className = 'selected';
    this.filterPrice = searchValue;
}
ShowOnlyStock(event) {
  if (this.filterBool.byStock === true) {

  this.filterBool = {byStock: false, isByPrice: this.orderByPriceBool};
} else {
  this.filterBool = {byStock: true, isByPrice: this.orderByPriceBool};
}
  if (event.target.className === '') {
  event.target.className = 'selected';
} else {
  event.target.className = '';
}

}
SortPriceFunc(event) {
  console.log('orderByPriceBool: ' + this.orderByPriceBool);
  if (this.orderByPriceBool === true) {
    this.orderByPriceBool = false;
    event.target.className = '';
  } else {
    this.orderByPriceBool = true;
    event.target.className = 'selected';
  }
  if (this.filterBool.byStock) {
    this.filterBool = {byStock: true, isByPrice: this.orderByPriceBool};
  } else {
    this.filterBool = {byStock: false, isByPrice: this.orderByPriceBool};
  }
}

  subcategoryFilterFunc = (name: string) => {
    if (name === 'all') {
      this.filterString = name;
    }
    this.filterString = name;
    this.subcategoriesArray.forEach(el => {
      // console.log('name: ' + el[0] + 'length: ' + el[1]);
      if (el[0] === name && el[1] > 0) {
      } else if (el[1] === 0) {
      }
    });
    this.filterString = name;
  }

  ngOnInit() {
    this.ProductsDataService.prodData().then( (response) => {
      this.searchResults = response;
      // populate favorites array
      const responseArray = [];
      responseArray.push(this.searchResults);
      responseArray[0].forEach(category => {
         category.subcategories.forEach(subcategory => {
           if (subcategory.items.length > 0) {
          this.subcategoriesArray.push([subcategory.name, subcategory.items.length]);
        }
           subcategory.items.forEach(item => {
           this.allProducts.push(item);
          });
       });
      });

}, (error) => {
  console.log('Error: ' + error.statusText);
});
    this.pricesFiltreArray = [{title: 'Under 3$', min: 0, max: 3},
      {title: '3$ to 6$', min: 3, max: 6},
      {title: '6$ to 10$', min: 6, max: 10},
      {title: 'over 10$', min: 10, max: 999},
      {title: 'Show all', min: 0, max: 999}
    ];

}


}
