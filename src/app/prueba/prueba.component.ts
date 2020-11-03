import { Component, OnInit } from '@angular/core';
import { Producto } from '../products/clases/producto';
import { PruebaService } from './prueba.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  prods: Producto[];
  count: number;
  carrito: any;

  constructor(private ps: PruebaService) {
    this.prods = [];
  }

  ngOnInit(): void {
    this.getCarrito();
  }
  
  getProds() {    
    this.ps.getProductos().subscribe(resp => {
      console.log(resp);
      this.prods = resp.productos;
    });
  }

  getCarrito() {
    this.ps.getCarrito().subscribe(resp => {
      console.log(resp);
    });
  }

}
