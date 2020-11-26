import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
}
