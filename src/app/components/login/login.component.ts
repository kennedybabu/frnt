import { Component, inject, OnInit } from '@angular/core';
import myAppConfig from '../../config/my-app-config';
import { OktaAuthStateService, OKTA_AUTH } from "@okta/okta-angular"
import OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuth, AuthState } from '@okta/okta-auth-js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  oktaSignin: any

  oktaAuthService = inject(OktaAuthStateService)
  okatAuth = inject(OKTA_AUTH)
  router = inject(Router)

  constructor() {
    this.oktaSignin = new OktaSignIn({
      features: {
        registration: true
      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    }
    )
  }

 async ngOnInit(): Promise<void> {
    // this.oktaSignin.remove();

    // this.oktaSignin.renderEl({
    //   el: '#okta-sign-in-widget'},
    //   (response: any) => {
    //     if(response.status === 'SUCCESS') {
    //       this.okatAuth.signInWithRedirect()
    //     }
    //   },
    // (error: Error) => {
    //   throw error;
    // })

    this.okatAuth.signInWithRedirect();

    const authState = await this.okatAuth.authStateManager.getAuthState();

    if(authState && authState.isAuthenticated) {
      this.router.navigate(['/products'])
      return
    }
  }

}
