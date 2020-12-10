import { Direccion } from './direccion';

export class Cliente {
    id: number;
    dni: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    fechaNacimiento:string;
    direccion: Direccion;
}