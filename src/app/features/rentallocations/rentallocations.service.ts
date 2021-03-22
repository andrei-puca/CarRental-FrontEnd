import { Injectable } from '@angular/core';
import { RentalLocations } from '../rentallocations/rentallocations.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class RentalLocationsService {
    
    formData: RentalLocations;
    readonly rootURL = 'http://localhost:5001'
    list: RentalLocations[];

    constructor(private http: HttpClient) { }

    clientList() {
        return this.http.get(this.rootURL + '/RentalLocations/GetAllRentalLocations');
    }
}