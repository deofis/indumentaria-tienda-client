import { Marca } from './marca';
import { UnidadMedida } from './unidad-medida';
import { Subcategoria } from './subcategoria';
import { PropiedadProducto } from './propiedad-producto';
import { Sku } from './sku';

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
    foto: File;
    imagenes: string[];
    destacado: boolean;
    activo: boolean;
    disponibilidadGeneral: number;
    propiedades:PropiedadProducto[];
    defaultSku:Sku;
    skus:Sku[];

}
