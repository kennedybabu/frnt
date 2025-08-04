import { Purchase } from './../common/purchase';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = environment.grabbitUrl + "/checkout/purchase";
  httpClient = inject(HttpClient)

  constructor() { }

  placeOrder(pruchase: Purchase): Observable<any> {
    console.log(pruchase,"data")
    return this.httpClient.post<Purchase>(this.purchaseUrl, pruchase);
  }
}
