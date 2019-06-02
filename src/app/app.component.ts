import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from './products-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductsDataService]

})

export class AppComponent implements OnInit {
  constructor(private ProductsDataService: ProductsDataService) {

  }
  title = 'app is functional!';
  ngOnInit() {
    this.ProductsDataService.prodData('angular').then( (response) => {
      alert('Total Libraries Found:' + response[0].category);
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }
}
