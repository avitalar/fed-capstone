import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { ProdApi } from '../prod-api';
import {ProductsDataService} from '../products-data.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  itemName: string;
  allProducts: Array<object> = [];
  searchResults: ProdApi;
  product: object;

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
      const allProducts = [];
      responseArray.push(this.searchResults);
      responseArray[0].forEach(category => {
         category.subcategories.forEach(subcategory => {
          subcategory.items.forEach(item => {
           this.allProducts.push(item);
          });
       });
      });

      allProducts.forEach(el => {
        if ((el.rating >= 5) && (el.price < 3) && (el.name !== 'Popcorn')) {
        this.product = el;
        }
      });

}, (error) => {
  console.log('Error: ' + error.statusText);
});
      }
}
}

