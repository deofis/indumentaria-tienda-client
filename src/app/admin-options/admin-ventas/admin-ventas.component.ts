import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../log-in/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-ventas',
  templateUrl: './admin-ventas.component.html',
  styleUrls: ['./admin-ventas.component.scss']
})
export class AdminVentasComponent implements OnInit {

  constructor( private router:Router,
               private authService: AuthService ) { }

  ngOnInit(): void {

  }

}
