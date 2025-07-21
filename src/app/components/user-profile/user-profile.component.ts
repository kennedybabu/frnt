import { Component, inject, OnInit } from '@angular/core';
import { OrderHistory } from '../../common/order-history';
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  orderHistoryService = inject(OrderHistoryService);
  storage: Storage = sessionStorage;
  userEmail!: string

  constructor(){}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    // get users email 
    const email = this.storage.getItem("email");
    // let userEmail;

    if(email != null) {
      this.userEmail = JSON.parse(email);
    }

    this.orderHistoryService.getOrderHistory(this.userEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders
      }
    )
  }

}
