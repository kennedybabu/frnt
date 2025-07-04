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

    getProductListPaginate(thePage: number, thePageSize: number, categoryId: number): Observable<GetResponseProduct> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` + `&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

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

  searchProducts(value: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${value}`

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(res => res._embedded.products)
    )
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId};`

    return this.httpClient.get<Product>(productUrl);
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
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}