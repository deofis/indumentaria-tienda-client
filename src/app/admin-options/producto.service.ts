import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/config';
import { Producto } from '../products/clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
url:string=API_BASE_URL+"/api";
  constructor(private http: HttpClient) { }

  createNewProduct(producto:Producto):Observable<Producto>{

    return this.http.post(`${this.url}/productos`,producto).pipe(
      map((response:any) =>response.producto as Producto)
    )
  }
}
 