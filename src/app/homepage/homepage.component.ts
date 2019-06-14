import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from '../products-data.service';
import { ProdApi } from '../prod-api';
import { element } from 'protractor';
import { ViewEncapsulation } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import {DOC_ORIENTATION} from 'ngx-image-compress/lib/image-compress';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  searchResults: ProdApi;
  favorites: Array<object> = [];
  favoriteItems: Array<object> = [];
  featuredItem: Array<object> = [];
  cartArray: Array<object> = [];
  element: Array<object> = [];
  imgObject: object;

// tslint:disable-next-line: no-shadowed-variable
  constructor(private ProductsDataService: ProductsDataService, private imageCompress: NgxImageCompressService) {   }

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  addToCart(addToCartObject) {
    this.cartArray.push(addToCartObject);
  }
  compressFile() {

    this.imageCompress.uploadFile().then(({image, orientation}) => {

      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );

    });

  }

  ngOnInit() {
console.log(this.featuredItem);
this.ProductsDataService.prodData().then( (response) => {
      this.searchResults = response;
      // populate favorites array
      const allProducts = [];
      const responseArray = [];
      responseArray.push(this.searchResults);
      responseArray[0].forEach(category => {
         category.subcategories.forEach(subcategory => {
          subcategory.items.forEach(item => {
           allProducts.push(item);
          });
       });
      });

      // for featured carousel - choose all products that are top rated and their price is lower than 3$
      allProducts.forEach(el => {
        if ((el.rating >= 5) && (el.price < 3) && (el.name !== 'Popcorn')) {
        this.featuredItem.push(el);
        }
      });

    }, (error) => {
      console.log('Error: ' + error.statusText);
    });
  }

//   dosomething = ($event) => {
//     const loadadimages = [];
//     loadadimages.push($event);
//     $($event.currentTarget).closest('.featuredImgWrapper').hover(function(){
//       $(this).find('.overlay').toggleClass('visible');
//   });
// }
}
