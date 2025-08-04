import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import OktaAuth from '@okta/okta-auth-js';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private oktaAuth = inject(OktaAuth);

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.addTokenIfNeeded(req)).pipe(
      switchMap(request => next.handle(request))
    );
  }

  private async addTokenIfNeeded(request: HttpRequest<any>): Promise<HttpRequest<any>> {
    const theEndpoint = environment.grabbitUrl + "/orders"
    const secureEndpoints = [theEndpoint];

    if (secureEndpoints.some(url => request.urlWithParams.includes(url))) {
      // Get access token
      const accessToken = await this.oktaAuth.getAccessToken();

      // Clone request with authorization header
      return request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }

    return request;
  }
}