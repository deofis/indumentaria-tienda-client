import { NumberFormatStyle } from '@angular/common';
import { Producto } from './producto';
import { ValorPropiedadProducto } from './valor-propiedad-producto';

export class Sku{
    id:number;
    nombre:string;
    descripcion:string;
    precio:number;
    precioOferta:number;
    disponibilidad:number;
    valoresData:string;
    valores:ValorPropiedadProducto [];
    defaultProducto:Producto;
    producto:Producto;
}