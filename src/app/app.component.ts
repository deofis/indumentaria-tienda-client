import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ecommerce';
  
  constructor(public router: Router){
    
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
