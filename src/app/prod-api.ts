export interface ProdApi {
    'category': string;
    'subcategories': Array<
        {
            'name': string,
            'items': Array<
                {
                    'name': string,
                    'description': string,
                    'price': number,
                    'imagelink': string,
                    'rating': number,
                    'stock': number,
                    'category': string,
                    'subcategory': string
                }
            >
        }
        >;
}
