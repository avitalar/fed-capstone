import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from '../products-data.service';
import { ProdApi } from '../prod-api';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchResults: ProdApi;

// tslint:disable-next-line: no-shadowed-variable
  constructor(private ProductsDataService: ProductsDataService) { }

  ngOnInit() {
    this.ProductsDataService.prodData('all').then( (response) => {
      this.searchResults = response;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

}
