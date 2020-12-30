import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_BASE_URL } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url:string = API_BASE_URL + "/api";

  constructor( private http: HttpClient ) { }


  //Proximo deploy cambia a '/ventas'
  getVentas(){
    return this.http.get(`${this.url}/operaciones`).pipe(map((resp:any) => {
      return resp.ventas
    }))
  };

}
