import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/config';
import { Producto } from '../products/clases/producto';
import { PropiedadProducto } from '../products/clases/propiedad-producto';
import { ValorPropiedadProducto } from '../products/clases/valor-propiedad-producto';
import { Sku } from '../products/clases/sku';
import { Promocion } from './admin-promos/clases/promocion';

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

  
  getAllProperties():Observable<PropiedadProducto[]>{
    return this.http.get(`${this.url}/productos/propiedades`).pipe( map( response => response as PropiedadProducto[]));
  
  }
  getPropertiesOfSubcategory(subcategoriaId:number):Observable<PropiedadProducto[]>{
    return this.http.get(`${this.url}/subcategorias/${subcategoriaId}/propiedades`).pipe( map( (response:any)=> response.propiedades as PropiedadProducto[]));
  
  }
  getPropertiesOfAProduct(id:number):Observable<PropiedadProducto[]>{
    return this.http.get(`${this.url}/productos/${id}/propiedades`).pipe( map( (response:any)=> response.propiedades as PropiedadProducto[]));
  }
  createNewSku(newSku:Sku, productoId:number):Observable<Sku>{
    return this.http.post(`${this.url}/productos/${productoId}/skus`,newSku).pipe(
      map((response:any) =>response )
    )
  }
  getAllTheSkus(productoId:number):Observable<Sku>{{
    return this.http.get(`${this.url}/productos/${productoId}/skus`).pipe(
      map((response:any) =>response.skus as Sku )
    )
  }}

  generateSkus(productoId:number){
    return this.http.post(`${this.url}/productos/${productoId}/generarSkus`,null).pipe(
      map((response:any) =>console.log(response) )
    );
  }

  deleteSku(skuId:number){
    return this.http.delete(`${this.url}/productos/skus/${skuId}`)
  }

  uploadPhoto(archivo: File, id: any){
    let formData = new FormData();
    formData.append("foto", archivo);
    formData.append("id", id);
    return this.http.post(`${this.url}/productos/${id}/fotos/principal`,formData).pipe(
      map((response:any) =>response)
    )
  }
  crearNewPromotionSub(promocion:Promocion, id:number){

    return this.http.post(`${this.url}/subcategorias/${id}/promociones`, promocion);

  };


  createNewPromotionProducto(promocion: Promocion, id:number){
    return this.http.post(`${this.url}/productos/${id}/promociones`, promocion);
  };

 


}

 