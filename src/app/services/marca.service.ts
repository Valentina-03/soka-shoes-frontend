import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { Marca } from '../models/Marca';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  uri = `${global.url}/marca`;
  constructor(private http:HttpClient) { }

  public getProductos(id:any):Observable<Producto[]>{
    return this.http.get<any>(`${this.uri}/${id}/productos`);
  }

  public getCntProductos(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/cntProductos`);
  }

  public getMarcas():Observable<Marca[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarMarca(marca:Marca):Observable<Marca>{
    return this.http.post<any>(`${this.uri}`, marca);
  }

  public encontrarMarca(id:any):Observable<Marca>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarMarca(marca:Marca):Observable<Marca>{
    return this.http.put<any>(`${this.uri}`,marca);
  }

  public eliminarMarca(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }

}
