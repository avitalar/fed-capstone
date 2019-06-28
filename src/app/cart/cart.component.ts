import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartArray: Array<object>;
  quantValue: number;
  cartSubtotal: number;
  ShippingValue = 10;
  quantityFunction(value: number) {
    this.quantValue = value;
  }
  UpdateCart(cartObject) {
    const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].addToCartItem.name === cartObject.name) {
        cartArray[i].quantValue = Math.floor(this.quantValue);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    this.cartArray = cartArray;
  }
  DeleteObject(objectToDelete) {
  const message = 'Are you sure you want to delete ' + objectToDelete.name;
  const result = window.confirm(message);
  if (result) {
    const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].addToCartItem.name === objectToDelete.name) {
        cartArray.splice(cartArray[i], 1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    this.cartArray = cartArray;
  }
  }

  CalcSubTotal() {
    let calcvar = 0;
    const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cartArray.length; i++) {
      calcvar += cartArray[i].addToCartItem.price * cartArray[i].quantValue;
    }
    return parseFloat(calcvar.toFixed(2));


  }
  calcTaxes() {
    let subtotal = this.CalcSubTotal();
    subtotal = subtotal * 17 / 100;
    return parseFloat(subtotal.toFixed(2));
  }
  cartTotalFunc() {
    let CartTotalSum: number;
    CartTotalSum = this.CalcSubTotal() + this.calcTaxes() + this.ShippingValue;
    return parseFloat(CartTotalSum.toFixed(2));

  }
  Checkout() {
    alert('All done :)');
  }
  constructor() { }
  calcLineItem(price: number, quantity: number) {
    const lineTotal =  price * quantity;
// tslint:disable-next-line: radix
    return parseFloat(lineTotal.toFixed(2));
  }
  ngOnInit() {
    this.cartArray = JSON.parse(localStorage.getItem('cart'));
  }

}
