import { Injectable } from '@angular/core';
import { ReservationList } from '../ReservationList/reservationlist.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ReservationListService {
    formData: ReservationList;
    readonly rootURL = 'http://localhost:5001'
    list: ReservationList[];

    constructor(private http: HttpClient) { }

    reservationList() {
        return this.http.get(this.rootURL + '/reservation/getreservationsdetailed');
    }

    refreshList() {
        const token = localStorage.getItem('userToken');
        this.http.get(this.rootURL + '/reservation/getreservationsdetailed')
            .toPromise()
            .then(res => this.list = res as ReservationList[]);
    }
}