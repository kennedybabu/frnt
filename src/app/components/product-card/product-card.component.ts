import { Component, input, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit{

  product = input.required<Product>();


  ngOnInit(): void {
    console.log(this.product)
  }

  addToCart(product: Product) {
    console.log(product)
  }
}
