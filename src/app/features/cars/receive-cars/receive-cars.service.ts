import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cars } from '../cars/cars.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReceiveCars } from './receive-cars.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiveCarsService {

  formData: ReceiveCars;
  carFormData: ReceiveCars;
  readonly rootURL = 'http://localhost:5001'
  list: ReceiveCars[];
  carList: ReceiveCars[];

  constructor(private http: HttpClient) { }

  getRentedCars() {
    return this.http.get(this.rootURL + '/car/rentedcars');
  }

  
  markCarAsAvailable() {
    this.formData.mileage = this.formData.mileage*1;
    return this.http.put(this.rootURL + '/Car/MarkCarAsAvailable', this.formData);
  }

  // refreshList(){
  //   const token = localStorage.getItem('userToken');
  //   this.http.get(this.rootURL+'/car/getallcars')
  //   .toPromise()
  //   .then(res => this.list = res as Cars[]);

  // }



}