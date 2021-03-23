import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarsMaintenance } from './cars-maintenance.model';

@Injectable({
    providedIn: 'root'
})
export class CarsMaintenanceService {
    formData: CarsMaintenance;
    readonly rootURL = 'http://localhost:5001'
    list: CarsMaintenance[];



    constructor(private http: HttpClient) { }


    carList() {
        return this.http.get(this.rootURL + '/carMaintenance');
    }


}