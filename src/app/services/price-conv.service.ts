import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrlResult } from '../models/brl-result';

@Injectable({
  providedIn: 'root'
})
export class PriceConvService {

  apiUrl = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL';

  constructor(private httpClient: HttpClient) { }

  getPrices(): Observable<BrlResult> {
    return this.httpClient.get<BrlResult>(this.apiUrl);
  }
}
