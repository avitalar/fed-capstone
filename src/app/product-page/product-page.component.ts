import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { ProdApi } from '../prod-api';
import {ProductsDataService} from '../products-data.service';
import { cartArray } from '../globals';


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

  addToCart(addToCartObject) {
    cartArray.push(addToCartObject);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    console.log(cartArray);
  }

  constructor(private ProductsDataService: ProductsDataService,private route: ActivatedRoute, private router: Router) {   }

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
      console.log(this.productArray);

}, (error) => {
  console.log('Error: ' + error.statusText);
});
      }
}
}

