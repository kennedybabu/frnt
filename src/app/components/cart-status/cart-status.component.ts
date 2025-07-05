import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  imports: [],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.scss'
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00
  totalQuantity: number = 0.00
  cartService = inject(CartService)

  ngOnInit(): void {
    this.updateCartStatus()
  }


  updateCartStatus() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }
}
