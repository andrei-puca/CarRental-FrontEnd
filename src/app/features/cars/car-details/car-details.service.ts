import { Injectable } from '@angular/core';
import { Cars } from '../cars/cars.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarDetails } from './car-details.model';


@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {

  readonly rootURL = 'http://localhost:5001'
  form: CarDetails;

  constructor(private http:HttpClient) { }


getLastServiceDate(id){
    return this.http.get(this.rootURL+'/CarMaintenance/LastServiceDate', id);
  }

getService(id){
  return this.http.get(this.rootURL+'/CarMaintenance/LastServiceDate/', {
    params: {
      id
    },
  });
  
}
}

