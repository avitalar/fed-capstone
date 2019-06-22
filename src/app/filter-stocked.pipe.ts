import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStocked'
})
export class FilterStockedPipe implements PipeTransform {

  transform(allProducts: any[], filter: boolean): any {
    if (!allProducts || !filter) {
      return allProducts;
    } else {
      return allProducts.filter(product => product.stock > 0);
    }
  }
}
