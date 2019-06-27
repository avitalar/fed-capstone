import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStocked'
})
export class FilterStockedPipe implements PipeTransform {
  transform(allProducts: any[], filterStock: any): any {
    console.log('filterStock pipe: ',filterStock)
    if (!allProducts || !filterStock.byStock) {
      return allProducts;
    } else if (filterStock.byStock && filterStock.isByPrice) {
      const stockedProducts =  allProducts.filter(product => product.stock > 0);
      return stockedProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);

    } else {
      return allProducts.filter(product => product.stock > 0);
    }
  }
}
