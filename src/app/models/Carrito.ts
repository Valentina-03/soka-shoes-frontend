import { Usuario } from './Usuario';
import { DetalleProducto } from './DetalleProducto';
export class Carrito
{
  idCarrito: number;
  cantidad: number;
  detalleProducto: DetalleProducto;
  usuario: Usuario;

  constructor(detalle: DetalleProducto, cantidad: number, usuario:Usuario) {
    this.detalleProducto = detalle;
    this.cantidad = cantidad;
    this.usuario = usuario;
  }
}
