import { Foto } from './foto';
import { Subcategoria } from './subcategoria';
export class Categoria {
    id:number;
    nombre:string;
   subcategorias:Subcategoria[];
   foto:Foto;
}
