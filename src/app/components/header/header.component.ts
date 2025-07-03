import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar'; // Import the module



@Component({
  selector: 'app-header',
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[]
  router = inject(Router);

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

