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
  selectedCategory = 'Showing all products';
  selectedCategoryLength;
  public isCollapsed: boolean[] = [];
  orderByPriceBool = false;
  filterBool = {byStock: false, isByPrice: this.orderByPriceBool};
  ClosePopup() {
    document.querySelector('.cartPopup').className = 'cartPopup';
  }

  isItemInCart(itemName, cartArray) {
    if (cartArray.length > 0) {
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].addToCartItem.name === itemName) {
            return true;
        }
    }
    return false;
  } else {
    return false;
  }
  }

  addToCart(addToCartItem: any, quantValue: any) {
    const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
    const cartObject = {addToCartItem, quantValue};
    const isExist = this.isItemInCart(addToCartItem.name, cartArray);
// tslint:disable-next-line: radix
    quantValue = parseInt(quantValue);
    if (!isExist) {
      cartArray.push(cartObject);
    } else {
// tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < cartArray.length; i++) {
// tslint:disable-next-line: radix
        if (cartArray[i].addToCartItem.name === addToCartItem.name) {
          quantValue = parseInt(quantValue);
          cartArray[i].quantValue += quantValue;
          break;
          }
      }
    }
    try {
      localStorage.setItem('cart', JSON.stringify(cartArray));
      document.querySelector('.cartPopup').className = 'cartPopup show';
    } catch (error) {
        console.error(error);
      }
  }

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

  subcategoryFilterFunc = (name: string, event,subLength) => {
    if (name === 'all') {
      this.selectedCategory = 'Showing all products';
    } else {
      this.selectedCategory = name;
    }
    if (subLength){
      this.selectedCategoryLength = subLength;
    } else {
      this.selectedCategoryLength = null;
    }
    this.filterString = name;
    const allBtns = document.querySelectorAll('.subcategoryBtn');
    allBtns.forEach(el => {
      el.className = 'subcategoryBtn';
    });
    event.target.className = 'subcategoryBtn selected';
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
      {title: 'Remove filter', min: 0, max: 999}
    ];

}


}
