import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../config/config';
import { PropiedadProducto } from '../products/clases/propiedad-producto';


@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  url:string = API_BASE_URL+"/api";

  constructor( private http: HttpClient ) { }


  crearNuevaPropiedadProducto(propiedad: PropiedadProducto, id:number){

    return this.http.post(`${this.url}/productos/${id}/propiedades`, propiedad);

  };

}
