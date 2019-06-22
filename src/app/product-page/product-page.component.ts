import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProdApi } from '../prod-api';
import {ProductsDataService} from '../products-data.service';
import { cartArray } from '../globals';
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
  quantValue = 1;

  quantityFunction(value) {
    this.quantValue = value;
  }

  addToCart(addToCartObject, quantValue: number) {
    const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (localStorageCart.length > 0) {
      console.log('local is bigger than 0');
// tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < localStorageCart.length; i++) {
        localStorageCart[i].quantValue = parseInt(localStorageCart[i].quantValue, 10);
        console.log('localStorageCart[i].addToCartObject.name: ' + localStorageCart[i].addToCartObject.name);
        console.log('addToCartObject.name: ' + addToCartObject.name);
        if (localStorageCart[i].addToCartObject.name === addToCartObject.name) {
          console.log('exist');
          localStorageCart[i].quantValue += quantValue;
          break;
         } else {
          localStorageCart.push({addToCartObject, quantValue});
         }

    }

  } else {
    localStorageCart.push({addToCartObject, quantValue});

  }
  localStorage.setItem('cart', JSON.stringify(localStorageCart));


}
  constructor(private ProductsDataService: ProductsDataService, private route: ActivatedRoute, private router: Router) {   }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.itemName = params.get('productName');
      this.showProduct();
    });
  }
    showProduct = () => {
      console.log('itemName: ' + this.itemName);
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
        }
      });

}, (error) => {
  console.log('Error: ' + error.statusText);
});
      }
}
}

