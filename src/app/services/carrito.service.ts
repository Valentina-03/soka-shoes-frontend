import { Carrito } from './../models/Carrito';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  uri =  `${global.url}/carrito`;

  constructor(private http:HttpClient) {}

   public getCarritos():Observable<Carrito[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarCarritos(carritos:Observable<Carrito[]>):Observable<Carrito[]>{
    return this.http.patch<any>(`${this.uri}/grupo`,carritos);
  }

  public eliminarCarritos(carritos:Observable<Carrito>):Observable<Carrito>{
    return this.http.patch<any>(`${this.uri}/grupo`, carritos);
  }

  public editarCarrito(carrito:Carrito):Observable<Carrito>{
    return this.http.put<any>(`${this.uri}`, carrito);
  }

  public encontrarCarrito(id:any):Observable<Carrito>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public eliminarCarrito(id:number):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
