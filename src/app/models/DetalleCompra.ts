import { DetalleProducto } from './DetalleProducto';
import { Compra } from './Compra';
import { Producto } from './Producto';
export class DetalleCompra
{
  idDetalle: number;
  cantidad: number;
  precioDet: number;
  precioTot: Producto;
  compra: Compra;
  detalleProducto: DetalleProducto;
}
