import { Purchase } from './../common/purchase';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = "http://localhost:8080/api/checkout/purchase";
  httpClient = inject(HttpClient)

  constructor() { }

  placeOrder(pruchase: Purchase): Observable<any> {
    console.log(pruchase,"data")
    return this.httpClient.post<Purchase>(this.purchaseUrl, pruchase);
  }
}
