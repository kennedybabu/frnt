import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = []
  totalPrice: Subject<number> =  new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  items: Subject<CartItem []> = new Subject<CartItem[]>();
  storge: Storage = localStorage;


  constructor() { 
    let data = this.storge.getItem('cartItems')

    if(data != null) {
      this.cartItems = JSON.parse(data);

      this.computeCartTotal();
    }
  }

  persistCartItems() {
    this.storge.setItem('cartItems', JSON.stringify(this.cartItems))
  }

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
    this.persistCartItems();

  }

  decrementQuantity(item: CartItem) {
    item.quantity--;

    if(item.quantity === 0) {
      this.removeItem(item)
    } else {
      this.computeCartTotal();
    }
  }

  removeItem(item: CartItem) {
    
    // get index
    const itemIndex = this.cartItems.findIndex(tempItem => tempItem.id === item.id);

    if( itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotal();
    }
  }
}
