import { Component, inject, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-detail',
  imports: [TabsModule, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

cartService = inject(CartService)
  
addToCart(product: Product) {
  const cartItem = new CartItem(product)
  this.cartService.addToCart(cartItem);
}

  product: Product = new Product();
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }


  handleProductDetails() {

    const id = +(this.route.snapshot.paramMap.get("id") || "0");

    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
      }
    )
  }



}
