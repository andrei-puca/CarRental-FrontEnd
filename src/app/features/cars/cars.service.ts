import { Injectable } from '@angular/core'
import { Cars } from '../cars/cars.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApiPaths } from 'app/shared/settings/api-paths'
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  formData: Cars
  list: Cars[]
  readonly baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  carList() {
    return this.http.get(this.baseUrl + ApiPaths.AllCars)
  }
}
