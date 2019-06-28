import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProdApi } from '../prod-api';
import {ProductsDataService} from '../products-data.service';
import { ɵBrowserPlatformLocation } from '@angular/platform-browser';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  itemName: string;
  allProducts: Array<object> = [];
  searchResults: ProdApi;
  productArray: Array<object> = [];
  cartArray: Array<object> = [];
  quantValue = 1;
  productRating: Array<any> = [];
  ClosePopup() {
    document.querySelector('.cartPopup').className = 'cartPopup';
  }

  quantityFunction(value) {
    this.quantValue = value;
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

  constructor(private ProductsDataService: ProductsDataService, private route: ActivatedRoute, private router: Router) {   }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.itemName = params.get('productName');
      this.showProduct();
    });
  }
    showProduct = () => {
      if (this.itemName != null) {
    this.ProductsDataService.prodData().then( (response) => {
      this.searchResults = response;
      // populate favorites array
      const responseArray = [];
      let allProducts = [];
      responseArray.push(this.searchResults);
      responseArray[0].forEach(category => {
         category.subcategories.forEach(subcategory => {
          subcategory.items.forEach(item => {
           this.allProducts.push(item);
          });
       });
      });

      allProducts = this.allProducts;
      allProducts.forEach(el => {
        if (el.name === this.itemName) {
        this.productArray.push(el);
        this.productRating.length = el.rating;
        }
      });


}, (error) => {
  console.log('Error: ' + error.statusText);
});
      }
}
}

