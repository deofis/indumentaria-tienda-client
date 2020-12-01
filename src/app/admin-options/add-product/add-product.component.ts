import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { Categoria } from 'src/app/products/clases/categoria';
import { AuthService } from '../../log-in/services/auth.service';
import { Router } from '@angular/router';
import { Subcategoria } from 'src/app/products/clases/subcategoria';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Marca } from 'src/app/products/clases/marca';
import { UnidadMedida } from 'src/app/products/clases/unidad-medida';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
showForm2:boolean = false;
categorias:Categoria[];
subcategorias: Subcategoria[];
marcas:Marca[];
categoriaSeleccionada: Categoria;
form:FormGroup;
oferta:boolean=false;
unidadesMedida:UnidadMedida[];
  constructor( private router:Router,
               private authService: AuthService,
               private catalogoservice:CatalogoService,
               private fb:FormBuilder,
               ) { 
     
}

  ngOnInit(): void {
    


  }

  showLateralMenu(){
    if (screen.width>650) {
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="200px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="block";
    let arrow= document.getElementById("botonMenu");
    arrow.style.display="none"
    } else{
     let lateralmenu=document.getElementById("lateralMenu");
     lateralmenu.style.opacity="0.9"
     lateralmenu.style.width="100%"
      let menu = document.getElementById("lateral-container");
       menu.style.display="block";
      let close = document.getElementById("close-menu");
      close.style.display="block";
      close.style.marginLeft="15px";
      close.style.fontSize="0.8em";
      let arrow = document.getElementById("open-menu");
      arrow.style.display="none"
    }
  }
  hiddeLateralMenu(){
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="30px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="none";
    let boton = document.getElementById("botonMenu");
    boton.style.display="block";
    let close = document.getElementById("close-menu");
    close.style.display="none";
    let arrow = document.getElementById("open-menu");
    arrow.style.display="block";
  }
  /**
   * Cerrar sesión y eliminar datos de la misma.
   */
  logout(): void {
    this.authService.logout();
    
    this.router.navigate(['/home']);
  }


  ///// *** *** STEP 2****** ///

  addProperty(){
    alert("agregando atributo")
  }


}
