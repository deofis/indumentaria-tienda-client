import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_BASE_URL } from '../../../config/config';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/log-in/clases/cliente/cliente';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PerfilClienteService {
  urlEndpoint: string;
  constructor(private http:HttpClient) { 
    this.urlEndpoint = `${API_BASE_URL}/api`;
  }

  getInfoPerfilCliente():Observable<Cliente[]>{
    return this.http.get(`${this.urlEndpoint}/perfil/cliente`).pipe( map( response => response as Cliente[]));
  }
}
