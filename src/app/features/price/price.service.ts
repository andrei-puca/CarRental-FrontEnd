import { Injectable } from '@angular/core'
import { Price } from '../price/price.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'environments/environment'
import { ApiPaths } from 'app/shared/settings/api-paths'

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  formData: Price
  readonly baseUrl = environment.baseUrl
  list: Price[]

  constructor(private http: HttpClient) {}

  priceList() {
    return this.http.get(this.baseUrl + ApiPaths.AllPricesDetailed)
  }
}
