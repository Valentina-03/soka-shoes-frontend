import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { Talla } from '../models/Talla';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class TallaService {

  uri = `${global.url}/talla`;
  constructor(private http:HttpClient) { }

  public getProductos(id:any):Observable<Producto[]>{
    return this.http.get<any>(`${this.uri}/${id}/productos`);
  }

  public getCntProductos(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/cntProductos`);
  }

  public getTallas():Observable<Talla[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarTalla(talla:Talla):Observable<Talla>{
    return this.http.post<any>(`${this.uri}`, talla);
  }

  public encontrarTalla(id:any):Observable<Talla>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarTalla(talla:Talla):Observable<Talla>{
    return this.http.put<any>(`${this.uri}`,talla);
  }

  public eliminarTalla(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }

}
