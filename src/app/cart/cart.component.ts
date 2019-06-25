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

  CalcSubTotal() {
    let calcvar = 0;
    const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cartArray.length; i++) {
      calcvar += cartArray[i].addToCartItem.price * cartArray[i].quantValue;
    }
    return calcvar;
  }
  calcTaxes(){
    let subtotal = this.CalcSubTotal();
    subtotal = subtotal * 17 / 100;
    return parseInt(subtotal.toFixed(2));
  }
  cartTotalFunc(){
    let CartTotalSum: number;
    CartTotalSum = this.CalcSubTotal() + this.calcTaxes() + this.ShippingValue;
    return CartTotalSum.toFixed(2);
  }
  Checkout(){
    alert('All done :)');
  }
  constructor() { }
  calcLineItem(price: number, quantity: number) {
    return price * quantity;
  }
  ngOnInit() {
    this.cartArray = JSON.parse(localStorage.getItem('cart'));
  }

}
