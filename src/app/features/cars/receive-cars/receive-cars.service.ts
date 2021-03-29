import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Cars } from '../cars/cars.model'
import { Observable } from 'rxjs/internal/Observable'
import { ReceiveCars } from './receive-cars.model'
import { ApiPaths } from 'app/shared/settings/api-paths'
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ReceiveCarsService {
  formData: ReceiveCars
  readonly baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  getRentedCars() {
    return this.http.get(this.baseUrl + ApiPaths.RentedCars)
  }

  markCarAsAvailable() {
    this.formData.mileage = this.formData.mileage * 1
    return this.http.put(
      this.baseUrl + ApiPaths.MarkCarAsAvailable,
      this.formData,
    )
  }

  // refreshList(){
  //   const token = localStorage.getItem('userToken');
  //   this.http.get(this.rootURL+'/car/getallcars')
  //   .toPromise()
  //   .then(res => this.list = res as Cars[]);

  // }
}
