import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/log-in/clases/cliente/cliente';
import { PerfilClienteService } from './services/perfil-cliente.service';

import {MatSnackBar} from '@angular/material/snack-bar';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  cliente: Cliente;

  formCliente: FormGroup;

  flagNombre: boolean = true;
  flagApellido: boolean = true;
  flagNacimiento: boolean = true;
  flagDni: boolean = true;
  flagTel: boolean = true;

  flagBoton: boolean = false;

  constructor( private prefilClienteService: PerfilClienteService,
               private fb: FormBuilder,
               private snackBar: MatSnackBar,
               private modalService: NgbModal ) { 
                
   }

  ngOnInit(): void {

    this.cliente = new Cliente();

    this.getPerfilCliente();

    this.crearFormDatosCliente();
    

    /* console.log(this.formCliente); */
    
  }


  getPerfilCliente(){

    this.prefilClienteService.getInfoPerfilCliente().subscribe((resp: any) => {
      this.cliente = resp
      /* console.log(this.cliente); */
      this.cargarDatosFormCliente();
    })

  }

  crearFormDatosCliente(){

    this.formCliente = this.fb.group({
      nombre: new FormControl({value: '', disabled: true}, Validators.required),
      apellido: new FormControl({value: '', disabled: true}, Validators.required),
      dni: new FormControl({value: '', disabled: true}),
      tel: new FormControl({value: '', disabled: true}),
      fechaNacimiento: new FormControl({value: '', disabled: true})
    })

  }

  cargarDatosFormCliente(){

    this.formCliente.setValue({
      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido,
      dni: this.cliente.dni,
      tel: this.cliente.telefono,
      fechaNacimiento: this.cliente.fechaNacimiento
    })

  }

  get nombreInvalido(){
    return this.formCliente.get('nombre').invalid && this.formCliente.get('nombre').touched;
  };

  get apellidoInvalido(){
    return this.formCliente.get('apellido').invalid && this.formCliente.get('apellido').touched;
  }

  editarAtributoCliente(control:string){
    this.flagBoton = true;
    this.formCliente.get(control).enable(); 
  }


  updateCliente(){


    if (this.formCliente.invalid) {

        return Object.values( this.formCliente.controls ).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach(control => control.markAsTouched());
        } else{
          control.markAsTouched();
        }
      });  
    }

    this.cliente.nombre = this.formCliente.controls.nombre.value;
    this.cliente.apellido = this.formCliente.controls.apellido.value;
    this.cliente.dni = this.formCliente.controls.dni.value;
    this.cliente.telefono = this.formCliente.controls.tel.value;
    this.cliente.fechaNacimiento = this.formCliente.controls.fechaNacimiento.value;

    console.log(this.formCliente, this.cliente);
    

    this.prefilClienteService.editarDatosCliente(this.cliente).subscribe(resp => {
      console.log(resp);
      this.formCliente.disable();
      this.prefilClienteService.getInfoPerfilCliente();
      this.flagNombre = true;
      this.flagApellido = true;
      this.flagNacimiento = true;
      this.flagDni = true;
      this.flagTel = true;
      this.flagBoton = false;
      this.openSnackBar(resp.mensaje, null)
      
    })

  };

  openSnackBar(message: string, action:string){
    this.snackBar.open(message, action, {duration: 2000, panelClass: ['snackPerfil']})
  };

  openModalEditPass(contenido){
    this.modalService.open(contenido, { size: 'lg', scrollable: true, keyboard: false, backdrop:'static', centered: true});
  };

  openModalEditDireccion(contenido){
    this.modalService.open(contenido, { size: 'lg', scrollable: true, keyboard: false, backdrop:'static', centered: true});
  };

}
