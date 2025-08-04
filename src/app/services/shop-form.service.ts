import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = environment.grabbitUrl + "/countries"
  private statesUrl = environment.grabbitUrl + "/states"

  httpClient = inject(HttpClient)

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for(let theMonth = startMonth;theMonth <= 12; theMonth++) {
      data.push(theMonth)
    }

    return of(data)
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[]= [];

    const startYear:number = new Date().getFullYear();
    const endYear:number = startYear + 10;

    for(let year = startYear; year <= endYear; year++) {
      data.push(year)
    }

    return of(data)
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(res => res._embedded.countries)
    )
  }

  getStates(countryCode: string): Observable<State[]> {
    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`

    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(
      map(res => res._embedded.states)
    )
  }
}


interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}