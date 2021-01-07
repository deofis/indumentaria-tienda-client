import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_BASE_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  url:string = API_BASE_URL + "/api";

  constructor( private http: HttpClient ) { }

  getVentasUser(){

    return this.http.get(`${this.url}/perfil/compras/historial`).pipe(map((resp:any) => {
        return resp.compras
    }))

  };
}
