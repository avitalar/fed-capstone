import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(allProducts: any[], filter: any): any {
    if (!allProducts || !filter) {
        return allProducts;
    }
    const result =  allProducts.filter(product => product.price > filter.min && product.price < filter.max );
    if (result.length !== 0) {
      return result;
    } else {
      alert('No products were found for: ' + filter.title + 'price range');
      return allProducts;
    }
  }
}
