import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  uri = `${global.url}/producto`;
  constructor(private http:HttpClient) { }

  public consultarProductos():Observable<any>{
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
  public deshabilitar(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/deshabilitar`);
  }
  public habilitar(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/habilitar`);
  }

  public consultarProductosClass():Observable<producto[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public contarProductos():Observable<producto[]>{
    return this.http.get<any>(`${this.uri}/cantidadDisponible`);
  }

}
