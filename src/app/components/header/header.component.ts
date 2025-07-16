import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CartStatusComponent } from "../cart-status/cart-status.component"; // Import the module
import { Button } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';


@Component({
  selector: 'app-header',
  imports: [MenubarModule, CartStatusComponent, Button, DrawerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  items!: MenuItem[]
  router = inject(Router);
  darkMode: boolean = false
  sidebarOpened: boolean = false

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

  toggleDarkMode() {
    const el = document.querySelector('html')
    el?.classList.toggle('dark-mode')
    this.darkMode = !this.darkMode
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened
   console.log('clocked')
  }

}

