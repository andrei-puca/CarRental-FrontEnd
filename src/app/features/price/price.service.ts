import { Injectable } from '@angular/core';
import { Price } from '../price/price.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  formData:Price;
  readonly rootURL = 'http://localhost:5001'
  list : Price[];

constructor(private http:HttpClient) { }

priceList(){
  return this.http.get(this.rootURL+'/Price/GetDetailedPrices');
}
}