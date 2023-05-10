import { Transaccionp } from './Transaccionp';
import { DetalleCompra } from './DetalleCompra';
import { Direccion } from './Direccion';
import { Usuario } from './Usuario';
export class Compra
{
  idCompra: number;
  estado: string;
  totalCompra: number;
  fecha: Date;
  usuario: Usuario;
  direccion: Direccion;
  detalleCompraCollection: DetalleCompra[];
  transaccionpCollection: Transaccionp;
}
