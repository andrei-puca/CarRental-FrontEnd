import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarsMaintenance } from './cars-maintenance.model';
import { ApiPaths } from 'app/shared/settings/api-paths';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarsMaintenanceService {
    formData: CarsMaintenance [];
    list: CarsMaintenance[];
    readonly baseUrl = environment.baseUrl;
    
    constructor(private http: HttpClient) { }
    
    carList() {
        return this.http.get(this.baseUrl + ApiPaths.CarsWithServiceOverdue);
    }

    CreateServiceRecord(formData) {
        return this.http.put(this.baseUrl + ApiPaths.CreateServiceRecord, formData)
      }

}