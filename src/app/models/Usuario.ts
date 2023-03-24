import { Rol } from './Rol';
import { Carrito } from './Carrito';
import { Compra } from './Compra';
import { Direccion } from './Direccion';
export class Usuario
{
  idUsuario: number;
  username: string;
  email: string;
  password: string;
  direcciones: Direccion[];
  compras: Compra[];
  carritos: Carrito[];
  roles: Rol[];
}
