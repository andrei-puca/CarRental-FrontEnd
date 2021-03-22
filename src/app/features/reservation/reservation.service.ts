import { Injectable } from '@angular/core';
import { Reservation } from '../Reservation/reservation.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cars } from '../cars/cars.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  formData: Reservation;
  carFormData: Cars;
  readonly rootURL = 'http://localhost:5001'
  list: Reservation[];
  carList: Cars[];

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get(this.rootURL + '/car/getallcars');
  }

  getClients() {
    return this.http.get(this.rootURL + '/clients/getallclients');
  }

  getLocations() {
    return this.http.get(this.rootURL + '/rentallocations/getallrentallocations');
  }

  getPrices() {
    return this.http.get(this.rootURL + '/price/getallprices');
  }

  CreateReservation() {
    return this.http.post(this.rootURL + '/reservation/createreservation', this.formData);
  }

  // refreshList(){
  //   const token = localStorage.getItem('userToken');
  //   this.http.get(this.rootURL+'/car/getallcars')
  //   .toPromise()
  //   .then(res => this.list = res as Cars[]);

  // }



}