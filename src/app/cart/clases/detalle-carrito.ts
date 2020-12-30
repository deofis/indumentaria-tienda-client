import { Sku } from './../../products/clases/sku';
export class DetalleCarrito {
    id: number;
    sku: Sku;
    cantidad: number;
    subtotal: number;

    public calcularSubtotal(): number {
        let subtotal =0
        if (this.sku.promocion !==null && this.sku.promocion.estaVigente) {
            subtotal=this.cantidad* this.sku.promocion.precioOferta;
            this.subtotal = subtotal;
        }else{
            subtotal = this.cantidad * this.sku.precio;
            this.subtotal = subtotal;
        }
      
        return this.subtotal;
    }
}