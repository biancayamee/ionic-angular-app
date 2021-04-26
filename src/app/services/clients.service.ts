import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private clientsUrl: string = 'http://localhost:3333/clients/'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }

  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.clientsUrl}`, this.httpOptions);
  }

  getClientById(id: string): Observable<Client> {
    return this.httpClient.get<Client>(`${this.clientsUrl}${id}`);
  }

  saveClient(name: string, cpf: string, email: string, gender: string) {
    return this.httpClient.post(
      this.clientsUrl,
      { name, cpf, email, gender },
    );
  }

  updateClientById(id: string, name: string, cpf: string, email: string, gender: string) {
    return this.httpClient.put(`${this.clientsUrl}${id}`,
      { name, cpf, email, gender },
    )
  }

  deleteClientById(id: string) {
    return this.httpClient.delete(`${this.clientsUrl}${id}`);
  }
}
