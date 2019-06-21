import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcategoryFilter'
})
export class SubcategoryFilterPipe implements PipeTransform {

  transform(allProducts: any[], filter: string): any {
    if (!allProducts || !filter) {
        return allProducts;
    }
    const filterTrimmed = filter.replace(/\s/g, '').toLowerCase();
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    const result =  allProducts.filter(product => product.subcategory.replace(/\s/g, '').toLowerCase().indexOf(filterTrimmed) !== -1);
    if (result.length !== 0) {
      return result;
    } else {
      alert('No products were found for: ' + filter);
      window.location.reload();
    }

  }

}
