import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {

  constructor() { }

  private loaderService = inject(LoaderService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🚀 Interceptor running for:', req.url);
    this.loaderService.show();
    console.log('Interceptor called for before:', req.url); 
    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide()
        console.log('Interceptor called for after:', req.url); 

      })
    )
  }
}
