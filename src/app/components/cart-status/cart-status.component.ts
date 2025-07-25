import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CartItem } from '../../common/cart-item';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart-status',
  imports: [DrawerModule, ButtonModule, CommonModule],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.scss'
})


export class CartStatusComponent implements OnInit {

decrementQuantity(item: CartItem) {
  this.cartService.decrementQuantity(item);
}


incrementQuantity(item: CartItem) {
  this.cartService.addToCart(item);
}

  totalPrice: number = 0.00
  totalQuantity: number = 0.00
  cartService = inject(CartService)
  router = inject(Router)
  cartItems: CartItem[] = []
  visible: boolean = false;

  ngOnInit(): void {
    this.updateCartStatus()
  }

  openCart() {
    this.visible = !this.visible
  }


  updateCartStatus() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.items.subscribe(
      data => this.cartItems = data
    )
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  checkout() {
    this.visible = false
    this.router.navigateByUrl("/checkout")
  }
}
