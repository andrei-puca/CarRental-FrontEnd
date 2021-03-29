import { Injectable } from '@angular/core'
import { RentalLocations } from '../rentallocations/rentallocations.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'environments/environment'
import { ApiPaths } from 'app/shared/settings/api-paths'

@Injectable({
  providedIn: 'root',
})
export class RentalLocationsService {
  formData: RentalLocations
  readonly baseUrl = environment.baseUrl
  list: RentalLocations[]

  constructor(private http: HttpClient) {}

  clientList() {
    return this.http.get(this.baseUrl + ApiPaths.AllRentalLocations)
  }
}
