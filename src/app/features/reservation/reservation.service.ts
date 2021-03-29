import { Injectable } from '@angular/core'
import { Reservation } from '../Reservation/reservation.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Cars } from '../cars/cars.model'
import { Observable } from 'rxjs/internal/Observable'
import { environment } from 'environments/environment'
import { ApiPaths } from 'app/shared/settings/api-paths'

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  formData: Reservation
  carFormData: Cars
  list: Reservation[]
  carList: Cars[]
  readonly baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  getAvailableCars() {
    return this.http.get(this.baseUrl + ApiPaths.AvailableCars)
  }

  getClients() {
    return this.http.get(this.baseUrl + ApiPaths.AllClients)
  }

  getLocations() {
    return this.http.get(this.baseUrl + ApiPaths.AllRentalLocations)
  }

  getPrices() {
    return this.http.get(this.baseUrl + ApiPaths.AllPrices)
  }

  CreateReservation() {
    console.log(this.formData)
    return this.http.post(
      this.baseUrl + ApiPaths.CreateReservation,
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
