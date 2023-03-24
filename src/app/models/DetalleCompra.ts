import { DetalleProducto } from './DetalleProducto';
import { Compra } from './Compra';
import { Producto } from './Producto';
export class DetalleCompra
{
  id_detalle: number;
  cantidad: number;
  precioDet: number;
  precioTot: Producto;
  compra: Compra;
  detalleproducto: DetalleProducto;
}
