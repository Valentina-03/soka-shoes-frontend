import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  uri = `${global.url}/categoria`;
  constructor(private http:HttpClient) { }

  public getProductos(id:number):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${id}/productos`);
  }

  public getCntProductos(id:number):Observable<number>{
    return this.http.get<any>(`${this.uri}/${id}/cntProductos`);
  }

  public getCategorias():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarCategoria(categoria:any):Observable<any>{
    return this.http.post<any>(`${this.uri}`, categoria);
  }

  public encontrarCategoria(id:number):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarCategoria(categoria:any):Observable<any>{
    return this.http.put<any>(`${this.uri}`,categoria);
  }

  public eliminarCategoria(id:number):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
