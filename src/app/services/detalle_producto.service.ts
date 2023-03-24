import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {

  uri = `${global.url}/detproducto`;
  constructor(private http:HttpClient) { }

  public getProductos():Observable<any>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarProducto(producto:any):Observable<any>{
    return this.http.post<any>(`${this.uri}`,producto);
  }

  public encontrarProducto(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarProducto(producto:any):Observable<any>{
    return this.http.put<any>(`${this.uri}`,producto);
  }

  public eliminarProducto(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
