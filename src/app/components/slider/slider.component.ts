import { Component, inject, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slider',
  imports: [RouterModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {

  productCategories!: ProductCategory[];

  productService = inject(ProductService)

  ngOnInit(): void {
    this.listProductCategories();
  }


  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('product categories = ' + JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }

  
}
