import { Cliente } from './cliente/cliente';

export class SignupRequest {
    email: string;
    password: string;
    cliente: Cliente;
}