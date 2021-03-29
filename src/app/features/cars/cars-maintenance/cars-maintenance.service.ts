import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarsMaintenance } from './cars-maintenance.model';

@Injectable({
    providedIn: 'root'
})
export class CarsMaintenanceService {
    formData: CarsMaintenance [];
    readonly rootURL = 'http://localhost:5001'
    list: CarsMaintenance[];
    data;
    private _items:CarsMaintenance[] = [];


    constructor(private http: HttpClient) { }


    
 
    addItem(item: CarsMaintenance) {
        this._items.push(item);
    }
    
    carList() {

        return this.http.get(this.rootURL + '/carMaintenance');
    }

    CreateServiceRecord(formData) {
        console.log("here3",formData);
        return this.http.put(this.rootURL + '/carmaintenance/servicerecord', formData)
      }

}