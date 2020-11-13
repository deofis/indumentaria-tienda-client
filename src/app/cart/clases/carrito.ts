import { DetalleCarrito } from './detalle-carrito';
export class Carrito {
    id: number;
    fechaCreacion: string;
    items: DetalleCarrito[];
    total: number;

    constructor() {
        this.fechaCreacion = new Date().toString();
        this.items = [];
    }

    public calcularTotal(): number {
        let total = 0;
        this.items.forEach(item => {
            total += total + item.calcularSubtotal();
        });
        this.total = total;
        return this.total;
    }
}