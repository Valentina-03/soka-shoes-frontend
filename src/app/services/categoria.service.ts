import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  uri = `${global.url}/categoria`;
  constructor(private http:HttpClient) { }

  public getProductos(id:number):Observable<Producto[]>{
    return this.http.get<any>(`${this.uri}/${id}/productos`);
  }

  public getCntProductos(id:number):Observable<number>{
    return this.http.get<any>(`${this.uri}/${id}/cntProductos`);
  }

  public getCategorias():Observable<Categoria[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarCategoria(categoria:Categoria):Observable<Categoria>{
    return this.http.post<any>(`${this.uri}`, categoria);
  }

  public encontrarCategoria(id:number):Observable<Categoria>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarCategoria(categoria:Categoria):Observable<Categoria>{
    return this.http.put<any>(`${this.uri}`,categoria);
  }

  public eliminarCategoria(id:number):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
