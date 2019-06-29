import { Injectable } from '@angular/core';
import { ProdApi } from './prod-api';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProductsDataService {
  constructor(private http: HttpClient) {
  }

  prodData = (): Promise<ProdApi> => {
    const promise = new Promise<ProdApi>((resolve, reject) => {
      /* rubric81 | Data was accessed using the Azure Web API and not a local file */
            this.http.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json')
            .toPromise()
            .then( (response) => {
                resolve(response as ProdApi);
            }, (error) => {
                reject(error);
            });
    });
    return promise;
  }
}
