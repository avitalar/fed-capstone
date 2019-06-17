import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcategoryFilter'
})
export class SubcategoryFilterPipe implements PipeTransform {

  transform(allProducts: any[], filter: object): any {
    if (!allProducts || !filter) {
        return allProducts;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return allProducts.filter(product => product.subcategory.indexOf(filter.subcategoryClick) !== -1);
}

}
