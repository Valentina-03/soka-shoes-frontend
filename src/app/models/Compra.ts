import { Transaccionp } from './Transaccionp';
import { DetalleCompra } from './DetalleCompra';
import { Direccion } from './Direccion';
import { Usuario } from './Usuario';
export class Compra
{
  id_compra: number;
  estado: string;
  total_compra: number;
  fecha: Date;
  usuario: Usuario;
  direccion: Direccion;
  detallesCompra: DetalleCompra[];
  transacciones: Transaccionp;
}
