import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


@Injectable()
export class LoaderService {

  constructor() { }
  private isLoading = new BehaviorSubject<boolean>(false);
  private apiCount = 0;

  loading$ = this.isLoading.asObservable();

  show() {
    console.log("called")
    if(this.apiCount === 0) {
      this.isLoading.next(true)
    }
    this.apiCount++
  }

  hide() {
    this.apiCount--;

    if(this.apiCount === 0) {
      this.apiCount = 0
      this.isLoading.next(false);
    }
  }

}
