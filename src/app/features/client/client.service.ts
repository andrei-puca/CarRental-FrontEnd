import { Injectable } from '@angular/core'
import { Client } from '../client/client.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'environments/environment'
import { ApiPaths } from 'app/shared/settings/api-paths'

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  formData: Client
  list: Client[]
  readonly baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  clientList() {
    return this.http.get(this.baseUrl + ApiPaths.AllClients)
  }

  refreshList() {
    const token = localStorage.getItem('userToken')
    this.http
      .get(this.baseUrl + ApiPaths.AllClients)
      .toPromise()
      .then((res) => (this.list = res as Client[]))
  }
}
