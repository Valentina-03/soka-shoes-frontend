import { DetalleProducto } from './DetalleProducto';
import { Categoria } from './Categoria';
import { Marca } from './Marca';
export class Producto
{
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
  cantidad: number;
  created_at: Date;
  updated_at: Date;
  marca: Marca;
  categoria: Categoria;
  detallesProducto: DetalleProducto[];
}
