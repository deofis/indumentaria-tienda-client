import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Cliente } from "src/app/log-in/clases/cliente/cliente";
import { Direccion } from "src/app/log-in/clases/cliente/direccion";
import { DetalleOperacion } from "./DetalleOperacion";
import { MedioPago } from "./MedioPago";
import { OperacionPago } from "./OperacionPago";


export class Operacion {
    cliente: Cliente;
    direccionEnvio: Direccion;
    estado: string;
    fechaEnviada: string;
    fechaOperacion: string;
    fechaRecibida: string;
    items: DetalleOperacion[];
    medioPago: MedioPago;
    nroOperacion: number;
    pago: OperacionPago;
    total: number;
}