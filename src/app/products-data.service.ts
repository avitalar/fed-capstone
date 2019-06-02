import { Injectable } from '@angular/core';
import { ProdApi } from './prod-api';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProductsDataService {
  cachedValues: Array<{
    [query: string]: ProdApi
  }> = [];
  constructor(private http: HttpClient) {
  }

  prodData = (query: string): Promise<ProdApi> => {
    const promise = new Promise<ProdApi>((resolve, reject) => {
        if (this.cachedValues[query]) {
            resolve(this.cachedValues[query]);
        } else {
            this.http.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json')
            .toPromise()
            .then( (response) => {
                resolve(response as ProdApi);
            }, (error) => {
                reject(error);
            });
        }
    });
    return promise;
  }
}
