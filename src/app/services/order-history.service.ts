import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor() { }

  private orderUrl = 'http://localhistory:8080/api/orders';

  httpClient = inject(HttpClient);

  getOrderHistory(email: string):Observable<GetResponseOrderHistory> {
    const historyUrl = `${this.orderUrl}/search/findByCustomerEmail?=email${email}`;

    return this.httpClient.get<GetResponseOrderHistory>(historyUrl);
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}
