import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "http://localhost:8080/api/products"

  httpClient = inject(HttpClient)

  constructor() { }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(res => res._embedded.products)
    )
  }
}


interface GetResponse {
  _embedded: {
    products:  Product[]
  }
}