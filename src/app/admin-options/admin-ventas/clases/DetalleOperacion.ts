import { Sku } from "src/app/products/clases/sku";


export class DetalleOperacion {
    cantidad: number;
    id: number;
    precioVenta: number;
    sku: Sku[];
    subtotal: number;
}