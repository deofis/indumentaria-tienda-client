import { NumberFormatStyle } from '@angular/common';
import { Producto } from './producto';

export class Sku{
    id:number;
    nombre:string;
    descripcion:string;
    precio:number;
    precioOferta:number;
    disponibilidad:number;
    valoresData:string;
    valores:string;
    defaultProducto:Producto;
    producto:Producto;
}