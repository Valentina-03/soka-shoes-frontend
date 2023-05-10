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
  direccionCollection: Direccion[];
  compraCollection: Compra[];
  carritoCollection: Carrito[];
  roles: Rol[];
}
