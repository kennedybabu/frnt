import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = []
  totalPrice: Subject<number> =  new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  items: Subject<CartItem []> = new Subject<CartItem[]>();


  constructor() { }

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem;

    if(this.cartItems.length > 0) {
      for(let tempItem of this.cartItems) {
        if(tempItem.id === theCartItem.id) {
          existingCartItem = tempItem;
          break
        }
      }

      // existingCartItem = this.cartItems.find( tempItem => tempItem.id === theCartItem.id)  

      alreadyExistsInCart = (existingCartItem != undefined);
    }

    // if already in cart ++ quantity
    if(alreadyExistsInCart) {
      existingCartItem.quantity++
    } else {
      this.cartItems.push(theCartItem)
    }

    this.computeCartTotal();
  }


  computeCartTotal() {
    let totalPriceValue: number = 0
    let quantityValue: number = 0

    for(let item of this.cartItems) {
      totalPriceValue += item.quantity * item.unitPrice
      quantityValue += item.quantity
    }

    // publish new values
    this.totalPrice.next(totalPriceValue)
    this.totalQuantity.next(quantityValue)
    this.items.next(this.cartItems)

    console.log(totalPriceValue, quantityValue, this.cartItems)
  }
}
