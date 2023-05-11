import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { DetalleProducto } from '../models/DetalleProducto';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {

  uri = `${global.url}/detproducto`;
  constructor(private http:HttpClient) { }

  public getByAll(idProducto:number, idColor:string, idTalla:number):Observable<DetalleProducto>{
    return this.http.get<any>(`${this.uri}/${idProducto}/${idColor}/${idTalla}`)
  }

  public getDetalles():Observable<DetalleProducto[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarDetalle(detalle:DetalleProducto):Observable<DetalleProducto>{
    return this.http.post<any>(`${this.uri}`,detalle);
  }

  public encontrarDetalle(id:any):Observable<DetalleProducto>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarDetalle(detalle:any):Observable<DetalleProducto>{
    return this.http.put<any>(`${this.uri}`,detalle);
  }

  public eliminarDetalle(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
