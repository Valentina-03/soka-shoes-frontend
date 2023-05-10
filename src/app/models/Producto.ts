import { DetalleProducto } from './DetalleProducto';
import { Categoria } from './Categoria';
import { Marca } from './Marca';
export class Producto
{
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
  cantidad: number;
  createdAt: Date;
  updatedAt: Date;
  marca: Marca;
  categoria: Categoria;
  detalleProductoCollection: DetalleProducto[];
}
