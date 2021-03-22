import { Injectable } from '@angular/core';
import { Client } from '../client/client.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  formData:Client;
  readonly rootURL = 'http://localhost:5001'
  list : Client[];



  constructor(private http:HttpClient) { }


clientList(){
  return this.http.get(this.rootURL+'/clients/getallclients');
}

refreshList(){
  const token = localStorage.getItem('userToken');
  this.http.get(this.rootURL+'/clients/getallclients')
  .toPromise()
  .then(res => this.list = res as Client[]);
 
}


}