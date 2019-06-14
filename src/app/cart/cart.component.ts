import { Component, OnInit } from '@angular/core';
import { cartArray } from '../globals';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartArray = cartArray;
  constructor() { }

  ngOnInit() {
  }

}
