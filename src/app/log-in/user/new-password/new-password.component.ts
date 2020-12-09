import { Component, OnInit } from '@angular/core';
import { ValidadoresService } from '../../services/validadores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
formNewPassword: FormGroup;
  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
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
   
  mostrarPsw2(){
    let input = document.getElementById("password2")as HTMLInputElement ;   
    if(input.type == "password"){
        input.type = "text";
      let icon= document.getElementById("show2")
      icon.style.visibility="hidden";
      let iconHide=document.getElementById("hide2");
      iconHide.style.visibility="visible"
    }else{
        input.type = "password";
        let icon= document.getElementById("show2")
        icon.style.visibility="visible";
        let iconHide=document.getElementById("hide2");
        iconHide.style.visibility="hidden"
    }
  }

  crearFormulario(): void {
    this.formNewPassword = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordRepeat: ["", Validators.required],
    }
    , {
      validators: this.validadores.passwordIguales('password', 'passwordRepeat')
    }
    )
  }

  cambiarPassword(): void {
    let newPassword: string;
    newPassword = this.formNewPassword.controls.password.value;

    this.activatedRoute.params.subscribe(param => {
      let token = param.token;
      this.authService.cambiarContraseña(newPassword, token).subscribe(response => {
        alert(response);
        this.router.navigate(['login']);
      }, err => {
        alert(err.error);
        throwError(err);
      });
    });
  }

  get passwordInvalida() {
    return this.formNewPassword.get('password').invalid && this.formNewPassword.get('password').touched;
  }
  
  get passwordNoIguales() {
    const pass1 = this.formNewPassword.get('password').value;
    const pass2 = this.formNewPassword.get('passwordRepeat').value;

    return (pass1 === pass2) ? false : true;
  }

}
