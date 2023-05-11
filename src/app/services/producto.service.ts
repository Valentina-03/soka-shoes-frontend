import { Producto } from './../models/Producto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { DetalleProducto } from '../models/DetalleProducto';
import { DetalleProductoDTO } from '../models/dto/detalleProducto-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  uri = `${global.url}/producto`;
  constructor(private http:HttpClient) { }

  public getDetallesProducto(id:any):Observable<DetalleProductoDTO[]>{
    return this.http.get<any>(`${this.uri}/${id}/detalles`);
  }

  public getDetalle(id:any, color:any, talla:any, cantidad:any):Observable<DetalleProducto>{
    return this.http.get<any>(`${this.uri}/${id}/disponible/${color}/${talla}/${cantidad}`);
  }

  public deshabilitar(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/deshabilitar`);
  }

  public habilitar(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/habilitar`);
  }

  public getCantidadProductos():Observable<any>{
    return this.http.get<any>(`${this.uri}/cantidadDisponible`);
  }

  public getProductos():Observable<Producto[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public getProductosFiltrados(ids: [[]]): Observable<Producto[]>{
    return this.http.post<any>(`${this.uri}/filtrar`, ids);
  }

  public getAllProductos():Observable<Producto[]>{
    return this.http.get<any>(`${this.uri}/all`);
  }

  public guardarProducto(producto:Producto):Observable<Producto>{
    return this.http.post<any>(`${this.uri}`,producto);
  }

  public encontrarProducto(id:number):Observable<Producto>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarProducto(producto:Producto):Observable<Producto>{
    return this.http.put<any>(`${this.uri}`,producto);
  }

  public eliminarProducto(id:number):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
