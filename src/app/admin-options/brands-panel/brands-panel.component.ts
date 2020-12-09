import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/log-in/services/auth.service';

@Component({
  selector: 'app-brands-panel',
  templateUrl: './brands-panel.component.html',
  styleUrls: ['./brands-panel.component.scss']
})
export class BrandsPanelComponent implements OnInit {
  brands:any[]=[ "Samsung","Iphone","Motorola","Nokia","Lenovo"]
  
  constructor( private router:Router,private authService: AuthService,) { }

  ngOnInit(): void {
  
  }
/// *** **** NEW BRAND **** **** ///
    showInput(){
    let input =   document.getElementById("newBrand")
    input.style.display="flex";
    input.style.justifyContent="space-between";
    input.style.alignItems="center";
    let option= document.getElementById("add");
    option.style.display="none"
  }

  addBrand(brand:string):void {
    brand=brand.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
      });
      
   this.brands.push(brand);
   let input = document.getElementById("input") as HTMLInputElement ;
   input.value=" ";
   
  }

}
