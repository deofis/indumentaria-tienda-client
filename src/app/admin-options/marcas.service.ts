import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/config';
import { Marca } from '../products/clases/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  url:string=API_BASE_URL+"/api";

  constructor( private http: HttpClient ) { }

  getBrands(){

    return this.http.get(`${this.url}/productos/marcas`).pipe(map((resp:any) => {
      return resp.marcas
    }))

  };

  getBrand(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.url}/productos/marcas/ver/{id}`);
  }

  createNewBrand(brand: Marca){

    return this.http.post(`${this.url}/productos/marcas`, brand);

  };

  modifyBrand(brand: Marca){

    return this.http.put(`${this.url}/productos/marcas/${brand.id}`, brand);

  };
  
  // addBrand(newBrand:Marca):Observable<Marca>{
   
  //   return this.http.post(`${this.url}/productos/marcas/nueva
  //   `,newBrand).pipe(
  //     map((response:any) =>response as Marca)
  //   )
  // }

}
