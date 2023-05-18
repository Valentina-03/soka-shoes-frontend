import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  uri = `${global.url}/usuario`;
  constructor(private http: HttpClient) { }

  public getCntClientes():Observable<any>{
    return this.http.get<any>(`${this.uri}/cantidadClientes`);
  }

  public usuarioPorEmail(email:string):Observable<any>{
    return this.http.get<any>(`${this.uri}/${email}/email`);
  }

  public carritoDeUsuario(idUsuario:number):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${idUsuario}/carrito`);
  }

  public addCarrito(idUsuario:number, detalle:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/${idUsuario}/addCarrito`,detalle);
  }

  public editarCarritos(idUsuario:number, carritos:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/${idUsuario}/editarCarritos`,carritos);
  }

  public eliminarCarrito(idUsuario:number, idcarro:number):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${idUsuario}/${idcarro}/eliminar`);
  }

  public comprasDeUsuario(id:any):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${id}/compras`);
  }

  public getUsuarios():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarUsuario(user:any):Observable<any>{
    return this.http.post<any>(`${this.uri}`,user);
  }

  public encontrarUsuario(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarUsuario(user:any):Observable<any>{
    return this.http.put<any>(`${this.uri}`,user);
  }

  public eliminarUsuario(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
