import { Injectable } from '@angular/core';
import { Cars } from '../cars/cars.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarDetails } from './car-details.model';
import { environment } from 'environments/environment';
import { ApiPaths } from 'app/shared/settings/api-paths';


@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {

  form: CarDetails;
  readonly baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }


getLastServiceDate(id){
    return this.http.get(this.baseUrl + ApiPaths.LastServiceDate, id);
  }

getService(id){
  return this.http.get(this.baseUrl + ApiPaths.LastServiceDate, {
    params: {
      id
    },
  });
  
}
}

