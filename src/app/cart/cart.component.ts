import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }
  cartArray: Array<object> = JSON.parse(localStorage.getItem('cart'));
  ngOnInit() {
  }

}
