import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcategoryFilter'
})
export class SubcategoryFilterPipe implements PipeTransform {

  transform(allProducts: any[], filter: string): any {
    if (!allProducts || !filter) {
        return allProducts;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    const result =  allProducts.filter(product => product.subcategory.replace(/\s/g, '').toLowerCase().indexOf(filter) !== -1);
    if (result.length !== 0) {
      console.log(result);
      return result;
    } else {
      $('.products').html('No results were found');
        }
  }

}
