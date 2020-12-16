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


  obtenerPropiedades(){
    return this.http.get(`${this.url}/productos/propiedades`).pipe(map((resp:any) => {
      return resp.propiedades;
    }))
  };

  obetenerCategorias(){

    return this.http.get(`${this.url}/categorias`).pipe(map((resp: any) => {
      return resp.categorias;
    }))

  };

  crearNuevaPropiedadProducto(propiedad: PropiedadProducto, id:number){

    return this.http.post(`${this.url}/productos/${id}/propiedades`, propiedad);

  };

  crearNuevaPropiedad(propiedad: PropiedadProducto){

    return this.http.post(`${this.url}/productos/propiedades`, propiedad);

  };

  crearNuevaPropiedadSubcategoria(propiedad: PropiedadProducto, idSub:number){

    return this.http.post(`${this.url}/subcategorias/${idSub}/propiedades`, propiedad);

  }

}
