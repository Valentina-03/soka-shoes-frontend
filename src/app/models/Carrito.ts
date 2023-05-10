import { Usuario } from './Usuario';
import { DetalleProducto } from './DetalleProducto';
export class Carrito
{
  idCarrito: number;
  cantidad: number;
  detalle: DetalleProducto;
  usuario: Usuario;

  constructor(detalle: DetalleProducto, cantidad: number, usuario:Usuario) {
    this.detalle = detalle;
    this.cantidad = cantidad;
    this.usuario = usuario;
  }
}
