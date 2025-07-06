import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CartStatusComponent } from "../cart-status/cart-status.component"; // Import the module



@Component({
  selector: 'app-header',
  imports: [MenubarModule, CartStatusComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  items!: MenuItem[]
  router = inject(Router);
  navigate() {
    this.router.navigateByUrl("/products")
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: PrimeIcons.HOME
      },
      {
        label: 'Account',
        icon: PrimeIcons.USER
      }
    ]
  }

  search(value: String) {
    console.log(value)
    this.router.navigateByUrl(`/search/${value}`);
  }


}

