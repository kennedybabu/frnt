import { OktaAuth } from '@okta/okta-auth-js';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { oktaConfig, routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import Lara from '@primeng/themes/lara';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';


const oktaAuth = new OktaAuth({
    clientId: '0oapnucx3lue2zj305d7',
    issuer:'https://dev-74952938.okta.com',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
})


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG(
      {
      theme: {
                preset: Lara,
                options: {
                  darkModeSelector: '.dark-mode'
                }
            }

    }
  ),
  importProvidersFrom(
    OktaAuthModule.forRoot({ oktaAuth })
  )
  ]
};
