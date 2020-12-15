import { Injectable } from '@angular/core';
import { Cars } from '../cars/cars.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  formData:Cars;
  readonly rootURL = 'http://localhost:5001'
  list : Cars[];



  constructor(private http:HttpClient) { }


carList(){
  return this.http.get(this.rootURL+'/car/getallcars');
}

refreshList(){
  const token = localStorage.getItem('userToken');
  this.http.get(this.rootURL+'/car/getallcars')
  .toPromise()
  .then(res => this.list = res as Cars[]);
 
}


}