import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'
import { Compra } from '../models/Compra';
@Injectable({
  providedIn: 'root'
})
export class CompraService {

  uri = `${global.url}/compra`;

  constructor(private http:HttpClient){}

  public getTotalVentas():Observable<any>{
    return this.http.get<any>(`${this.uri}/total`);
  }

  public getTransaccionesPorCompra(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/transacciones`);
  }

  public getCompras():Observable<Compra[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public encontrarCompra(id:any):Observable<Compra>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public guardarCompra(idUsuario:any, idDireccion:any):Observable<Compra>{
    return this.http.get<any>(`${this.uri}/${idUsuario}/${idDireccion}`);
  }

  public editarCompra(compra:any):Observable<any>{
    return this.http.put<any>(`${this.uri}`,compra);
  }
}
