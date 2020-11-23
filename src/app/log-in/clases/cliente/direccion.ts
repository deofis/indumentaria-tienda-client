import { Ciudad } from './ciudad';

export class Direccion {
    id: number;
    ciudad: Ciudad;
    calle: string;
    numeroCalle: number;
    piso: string;
    codigoPostal: string;
}