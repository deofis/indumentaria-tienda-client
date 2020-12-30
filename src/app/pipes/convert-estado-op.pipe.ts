import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertEstadoOp'
})
export class ConvertEstadoOpPipe implements PipeTransform {

  transform(estado: string): string {
    if (estado === "PAYMENT_PENDING") {
      return "Pendiente de pago"
    }else if (estado === "PAYMENT_DONE") {
      return "Pago realizado"
    }else if (estado === "SENT") {
      return "Enviado"
    }else if (estado === "RECEIVED") {
      return "Recibido"
    }else if (estado === "CANCELLED") {
      return "Cancelado"
    }
  }

}
