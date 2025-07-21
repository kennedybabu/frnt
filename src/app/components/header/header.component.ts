import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CartStatusComponent } from "../cart-status/cart-status.component"; // Import the module
import { Button } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-header',
  imports: [MenubarModule, CartStatusComponent, Button, DrawerModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  items!: MenuItem[]
  router = inject(Router);
  private oktaAuthService = inject(OktaAuthStateService)
  private oktaAuth = inject(OKTA_AUTH)
  darkMode: boolean = false
  sidebarOpened: boolean = false
  isAuthenticated!: boolean
  userFullName!: string
  storage: Storage = sessionStorage;



  navigate() {
    this.router.navigateByUrl("/products")
  }

  login() {
    this.router.navigateByUrl("/login")
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
  
    // susbcribe for any changes
    this.oktaAuthService.authState$.subscribe(authState => {
      if(authState) {
        this.isAuthenticated = authState.isAuthenticated ?? false;
      }
    }
    )
  }

  // trials
  public isAuthenticated$ = this.oktaAuthService.authState$.pipe(
    filter((s: AuthState) => !!s),
    map((s:AuthState) => s.isAuthenticated ?? false)
  )

  public name$ = this.oktaAuthService.authState$.pipe(
    filter((authState: AuthState) => !!authState && !! authState.isAuthenticated),
    map((authState: AuthState) => {
      authState.idToken?.claims.name ?? '';
      let userEmail = authState.idToken?.claims.email
      this.storage.setItem("email", JSON.stringify(userEmail))
    })
  )

  viewProfile() {
    this.router.navigateByUrl("/user-profile")
  }

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    console.log('clicked')
    await this.oktaAuth.signOut();
  }

  getUserDetails() {
    // if(this.isAuthenticated) {
    //   this.oktaAuthService.getUser().then(
    //     (res: any) => {
    //       this.userFullName = res.name
    //     }
    //   )
    // }
    this.oktaAuthService.authState$.subscribe(authState => {
      console.log(authState.idToken?.claims)
    })
  }
  
  public async logout() {
    // terminate the session and remove current tokens
    await this.oktaAuth.signOut();
  }

  search(value: String) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  toggleDarkMode() {
    const el = document.querySelector('html')
    el?.classList.toggle('dark-mode')
    this.darkMode = !this.darkMode
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened
  }

}

