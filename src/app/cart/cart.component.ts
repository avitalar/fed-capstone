import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartArray: Array<object>;
  quantValue: number;
  quantityFunction(value: number) {
    this.quantValue = value;
  }
  UpdateCart(cartObject) {
    const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cartArray.length; i++) {
      console.log(typeof(cartArray[i].quantValue));
      console.log(typeof(this.quantValue));
      if (cartArray[i].addToCartItem.name === cartObject.name) {
        cartArray[i].quantValue = Math.floor(this.quantValue);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
  }
  DeleteObject(objectToDelete) {
    const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].addToCartItem.name === objectToDelete.name) {
        cartArray.splice(cartArray[i],1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    this.cartArray = cartArray;

  }
  constructor() { }
  calcLineItem(price: number, quantity: number) {
    return price * quantity;
  }
  ngOnInit() {
    this.cartArray = JSON.parse(localStorage.getItem('cart'));

  }

}
