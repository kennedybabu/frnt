import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  products!:  Product[];
  categoryId!: number



  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

  }

  listProducts() {
    // check if "id" paramater is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId) {
      // get the id and convert to number 
      this.categoryId = +(this.route.snapshot.paramMap.get("id") || "0") ;
    } else {
      this.categoryId = 1
    }


    this.productService.getProductList(this.categoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
