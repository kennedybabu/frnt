import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  products!:  Product[];
  categoryId!: number
  searchMode!: boolean



  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if(this.searchMode) {
      this.handleSearchProducts()
    } else {
      this.handleListProducts();

    }
  }

  handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get("keyword");

    // search for products using the keyword 
    if(keyword != null) {
      this.productService.searchProducts(keyword).subscribe(
        data => {
          this.products = data;
        }
      )
    }
  }


  handleListProducts() {
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
