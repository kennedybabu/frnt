import { Component, input, OnInit } from '@angular/core';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit{

  product = input.required<Product>();


  ngOnInit(): void {
    console.log(this.product)
  }
}
