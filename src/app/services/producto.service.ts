import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  uri = `${global.url}/producto`;
  constructor(private http:HttpClient) { }

  public getDetallesProducto(id:any):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${id}/detalles`);
  }

  public getDetalle(id:any, color:any, talla:any, cantidad:any):Observable<any>{
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

  public getProductos():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public getProductosFiltrados(ids: any[][]): Observable<any[]>{
    return this.http.post<any>(`${this.uri}/filtrar`, ids);
  }

  public getAllProductos():Observable<any[]>{
    return this.http.get<any>(`${this.uri}/all`);
  }

  public guardarProducto(producto:any, detalles:any[]):Observable<any>{
    const body = {
      producto: producto,
      detalles: detalles
    };
    return this.http.post<any>(`${this.uri}`, body);
  }

  public editarProducto(producto:any, detalles:any[]):Observable<any>{
    const body = {
      producto: producto,
      detalles: detalles
    };
    return this.http.put<any>(`${this.uri}`, body);
  }

  public encontrarProducto(id:number):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

}
