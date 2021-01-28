import { Direccion } from './../../../log-in/clases/cliente/direccion';
import { Cliente } from './../../../log-in/clases/cliente/cliente';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_BASE_URL } from '../../../config/config';
import { Observable } from 'rxjs';
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

  editarInfoPerfilCliente(direccion:Direccion):Observable<any>{
    return this.http.put(`${this.urlEndpoint}/perfil/cliente/direccion`, direccion);

  }

  //perfil/cliente/actualizar
  editarDatosCliente(cliente: Cliente){

    return this.http.put(`${this.urlEndpoint}/perfil/actualizar-cliente`, cliente).pipe(map ((resp: any) => {
      return resp
    }))

  }


  
  changePass(passReq){
    return this.http.post(`${this.urlEndpoint}/auth/cambiar-password`, passReq, {responseType: 'text'})
  }

  editarDireccionCliente(direccion: Direccion){
    return this.http.put(`${this.urlEndpoint}/perfil/cliente/direccion`, direccion)
  }

}
