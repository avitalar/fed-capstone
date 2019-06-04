import { Component, OnInit } from '@angular/core';
import {ProductsDataService} from './products-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductsDataService]

})

export class AppComponent implements OnInit {
// tslint:disable-next-line: no-shadowed-variable
  constructor(private ProductsDataService: ProductsDataService) {

  }
  title = 'app is functional!';
  ngOnInit() {
  }
}
