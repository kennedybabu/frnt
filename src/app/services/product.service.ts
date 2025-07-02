import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "http://localhost:8080/api/products"
  private categoryUrl = "http://localhost:8080/api/product-category"

  httpClient = inject(HttpClient)

  constructor() { }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(res => res._embedded.products)
    )
  }

  getProductCategories(): Observable<ProductCategory[]> {
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(res => res._embedded.productCategory)
    )
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory:  ProductCategory[]
  }
}


interface GetResponseProduct {
  _embedded: {
    products:  Product[]
  }
}