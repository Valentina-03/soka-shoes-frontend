import { Producto } from './Producto';
export class Categoria
{
  idCategoria: number;
  nombre: string;
  descripcion: string;
  productoCollection: Producto[];
}
