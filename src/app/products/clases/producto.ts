import { Marca } from './marca';
import { UnidadMedida } from './unidad-medida';
import { Subcategoria } from './subcategoria';

export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precioOferta:number;
    marca: Marca;
    subcategoria: Subcategoria;
    unidadMedida: UnidadMedida;
    fechaCreacion: number;
    foto: string;
    destacado: boolean;
    activo: boolean;
    disponibilidad: number;
}
