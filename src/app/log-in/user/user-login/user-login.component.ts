import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IniciarSesionRequest } from '../../clases/login-request';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../../config/config';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
     //// OLVIDE MI CONTRASENA
     let recuperar= document.getElementById("recuperar");
     recuperar.addEventListener("click",()=> {
       // ocultar form inicio de sesion
       this.hiddeForm();
       //mostrar contenedors recuperar contrasena
       let uno=document.getElementById("contenedor-forgot-psw");
       uno.style.display="flex";
       uno.style.flexDirection="column";
       uno.style.justifyContent="space-around";
       uno.style.alignItems="center";
       
     })
  
     ///VOLVER ATRAS
     let arrow1=document.getElementById("back");
     arrow1.addEventListener("click",this.return) ;  
 
  }

  mostrarPsw(){
    let input = document.getElementById("password")as HTMLInputElement ;   
    if(input.type == "password"){
        input.type = "text";
      let icon= document.getElementById("show")
      icon.style.visibility="hidden";
      let iconHide=document.getElementById("hide");
      iconHide.style.visibility="visible"
    }else{
        input.type = "password";
        let icon= document.getElementById("show")
        icon.style.visibility="visible";
        let iconHide=document.getElementById("hide");
        iconHide.style.visibility="hidden"
    }

 
  }
  /// metodo para ocultar el formulario de inicio de sesion
hiddeForm(){
  let uno=document.getElementById("is-uno");
  let dos=document.getElementById("is-dos");
  let tres=document.getElementById("is-tres");
  uno.style.display="none";
  dos.style.display="none";
  tres.style.display="none";
}
//FIN ocultar formulario inicio de sesion

///inicio metodo para ir atras con la flecha
return(){
  //ocultar
  let contForgotPsw=document.getElementById("contenedor-forgot-psw");
  contForgotPsw.style.display="none";
  //mostrar inicio de sesion
  let uno=document.getElementById("is-uno");
  let dos=document.getElementById("is-dos");
  let tres=document.getElementById("is-tres");
  uno.style.display="flex";
  uno.style.flexDirection="column";
  uno.style.justifyContent="space-around";
  uno.style.alignItems="center";
  dos.style.display="flex";
  dos.style.justifyContent="space-between";
  dos.style.alignItems="center";
  tres.style.display="flex";
  tres.style.flexDirection="column";
  tres.style.justifyContent="space-between";
  tres.style.alignItems="center";
}
 ///FIN metodo para ir atras 


}
