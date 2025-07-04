import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule, PaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  products!:  Product[];
  categoryId: number = 1
  searchMode!: boolean
  previousCategoryId: number = 1;



  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

  }

  thePageNumber: number = 0;
  thePageSize: number = 20;
  totalElements: number = 0
  first: number = 0;

  onPageChange(event: PaginatorState) {
      console.log(event)
      this.thePageNumber = event.page ?? 0;
      this.thePageSize = event.rows ?? 20;
      this.first = event.first ?? 0;

      this.handleListProducts();
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


    // check if we have a diff category than prev
    // if we have a diff catefory id than prev, then we set thePageNumber back to 1

    if(this.previousCategoryId != this.categoryId) {
      this.thePageNumber = 0;
      this.first = 0;
    }

    this.previousCategoryId = this.categoryId;

    this.productService.getProductListPaginate(this.thePageNumber, this.thePageSize, this.categoryId).subscribe(
      this.processResult()
    )
    
  }


  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number;
      this.thePageSize = data.page.size;
      this.totalElements = data.page.totalElements;
      this.first = data.page.number * data.page.size
    }
  }

}
