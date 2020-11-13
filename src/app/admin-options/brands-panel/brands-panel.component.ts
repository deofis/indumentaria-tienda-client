import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/log-in/services/auth.service';

@Component({
  selector: 'app-brands-panel',
  templateUrl: './brands-panel.component.html',
  styleUrls: ['./brands-panel.component.scss']
})
export class BrandsPanelComponent implements OnInit {
 brands:any[]=[
  {name: "Samsung"},
  {name: "Iphone"},
  {name: "Motorola"},
  {name: "Nokia"},
  {name: "Lenovo"},

]
constructor( private router:Router,
  private authService: AuthService,) {

}

  ngOnInit(): void {
    let input=  document.getElementById("newBrand");
    // input.addEventListener("keyup", )
    let icon = document.getElementById("plus");
    input.addEventListener("click", this.addBrand)
  }

    showInput(){
    let input =   document.getElementById("newBrand")
    input.style.display="flex";
    input.style.justifyContent="space-between";
    input.style.alignItems="center";
    let option= document.getElementById("add");
    option.style.display="none"
  }

  addBrand(){
    let input =   document.getElementById("newBrand")  as HTMLInputElement;
    let newbrand=input.value;
    console.log(input.value)
  }
    //// **** *** LATERAL MENU *** **** /////
    showLateralMenu(){
      if (screen.width>800) {
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
      arrow.style.display="block"
    }
  /**
   * Cerrar sesión y eliminar datos de la misma.
   */
  logout(): void {
    this.authService.logout();
    
    this.router.navigate(['/home']);
  }
}
