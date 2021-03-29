import { Injectable } from '@angular/core'
import { ReservationList } from '../ReservationList/reservationlist.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'environments/environment'
import { ApiPaths } from 'app/shared/settings/api-paths'

@Injectable({
  providedIn: 'root',
})
export class ReservationListService {
  formData: ReservationList
  list: ReservationList[]
  readonly baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  reservationList() {
    return this.http.get(this.baseUrl + ApiPaths.ReservationsList)
  }

  refreshList() {
    const token = localStorage.getItem('userToken')
    this.http
      .get(this.baseUrl + '/reservation/getreservationsdetailed')
      .toPromise()
      .then((res) => (this.list = res as ReservationList[]))
  }
}
