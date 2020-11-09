import { Direccion } from './direccion';

export class Cliente {
    id: number;
    idPersona: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: Direccion;
}