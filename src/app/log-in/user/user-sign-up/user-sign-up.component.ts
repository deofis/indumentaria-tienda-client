import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequest } from '../../clases/signup.request';
import { ValidadoresService } from '../../services/validadores.service';
import { AuthService } from '../../services/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})
export class UserSignUpComponent implements OnInit {

  formRegistro: FormGroup;
  signupRequest: SignupRequest;

  constructor(private fb: FormBuilder,
    private router: Router,
    private validadores: ValidadoresService,
    private authService: AuthService) {
    this.signupRequest = new SignupRequest();
  }

  ngOnInit(): void {
    /***** mostrar mensaje cta creada */
    this.crearFormulario();
  }

  //// ******** show psw *********///

  mostrarPsw1() {
    let input = document.getElementById("new-pasw") as HTMLInputElement;
    if (input.type == "password") {
      input.type = "text";
      let icon = document.getElementById("show1")
      icon.style.visibility = "hidden";
      let iconHide = document.getElementById("hide1");
      iconHide.style.visibility = "visible"
    } else {
      input.type = "password";
      let icon = document.getElementById("show1")
      icon.style.visibility = "visible";
      let iconHide = document.getElementById("hide1");
      iconHide.style.visibility = "hidden"
    }
  }
  mostrarPsw2() {
    let input = document.getElementById("new-pasw-repeat") as HTMLInputElement;
    if (input.type == "password") {
      input.type = "text";
      let icon = document.getElementById("show2")
      icon.style.visibility = "hidden";
      let iconHide = document.getElementById("hide2");
      iconHide.style.visibility = "visible"
    } else {
      input.type = "password";
      let icon = document.getElementById("show2")
      icon.style.visibility = "visible";
      let iconHide = document.getElementById("hide2");
      iconHide.style.visibility = "hidden"
    }
  }
  ///// show message
  showMessage() {
    let contRegistr = document.getElementById("contenedor-registrarse");
    contRegistr.style.display = "none";
    let msj = document.getElementById("msje-registro");
    msj.style.display = "block";
    msj.style.width = "70%";
    let contBlanco = document.getElementById("cont-form");
    contBlanco.style.marginTop = "-380px";
  }

  /**
   * Crea el formulario a través de FormBuilder, con los campos:
   *                                        -email: obligatorio, patron de email @example.com
   *                                        -password: obligatorio
   */
  crearFormulario(): void {
    this.formRegistro = this.fb.group({
      // Expresion regular para verificar que sea un email correcto.
      email: ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordRepeat: ["", Validators.required],
      cliente: this.fb.group({
        //id: [""],
        nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        // direccion: [""]
      }),
    }, {
      validators: this.validadores.passwordIguales('password', 'passwordRepeat')
    });
  }

  get nombreInvalido() {
    return this.formRegistro.get('cliente.nombre').invalid && this.formRegistro.get('cliente.nombre').touched;
  }

  get apellidoInvalido() {
    return this.formRegistro.get('cliente.apellido').invalid && this.formRegistro.get('cliente.apellido').touched;
  }

  /**
   * Getter validador de email.
   * @return: true si el campo email es invalido y ha sido tocado.
   */
  get emailInvalido() {
    return this.formRegistro.get('email').invalid && this.formRegistro.get('email').touched;
  }

  /**
   * Getter validador de password.
   * @return: true si el campo password es invalido y ha sido tocado.
   */
  get passwordInvalida() {
    return this.formRegistro.get('password').invalid && this.formRegistro.get('password').touched;
  }

  /**
   * Getter validador de passwords iguales.
   * @return: true si las contraseñas NO son iguales.
   */
  get passwordNoIguales() {
    const pass1 = this.formRegistro.get('password').value;
    const pass2 = this.formRegistro.get('passwordRepeat').value;

    return (pass1 === pass2) ? false : true;
  }

  /**
   * Registra la nueva cuenta. Toma los datos de los campos del formulario, y si son validos, hace una peticion 
   * POST a la API de registrar usuario para completar el registro.
   */
  registrarse(): void {


    if (this.formRegistro.invalid) {
      return Object.values(this.formRegistro.controls)
        .forEach(control => control.markAsTouched());
    }

    this.signupRequest.email = this.formRegistro.controls.email.value;
    this.signupRequest.password = this.formRegistro.controls.password.value;
    this.signupRequest.cliente = this.formRegistro.controls.cliente.value;

    console.log(this.signupRequest);
    
    this.authService.signup(this.signupRequest).subscribe(response => {
      console.log(response);
      
      this.showMessage();
    }, err => {
      console.log(err.error);
      throwError(err);
    });
  }

}
