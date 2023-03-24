import { Talla } from './Talla';
import { Producto } from './Producto';
import { Color } from './Color';
export class DetalleProducto
{
  id_detalle: number;
  img: string;
  cantidad: number;
  producto: Producto;
  color: Color;
  talla: Talla;
}
