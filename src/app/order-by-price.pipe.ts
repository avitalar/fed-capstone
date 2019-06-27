import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByPrice'
})
export class OrderByPricePipe implements PipeTransform {

  transform(allProducts: any[], filter: boolean): any {

    if (!allProducts || !filter) {
      console.log('subcategory sort');
      return allProducts.sort((a, b) => (a.subcategory > b.subcategory) ? 1 : -1);
    } else {
      console.log('price sort');

      return allProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);
    }
  }
}
