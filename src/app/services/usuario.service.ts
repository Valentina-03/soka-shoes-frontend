import { Usuario } from './../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'
import { Carrito } from '../models/Carrito';
import { Compra } from '../models/Compra';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  uri = `${global.url}/usuario`;
  constructor(private http: HttpClient) { }

  public getCntClientes():Observable<any>{
    return this.http.get<any>(`${this.uri}/cantidadClientes`);
  }

  public usuarioPorEmail(email:string):Observable<Usuario>{
    return this.http.get<any>(`${this.uri}/${email}/email`);
  }

  public carritoDeUsuario(idUsuario:number):Observable<Carrito[]>{
    return this.http.get<any>(`${this.uri}/${idUsuario}/carrito`);
  }

  public comprasDeUsuario(id:any):Observable<Compra[]>{
    return this.http.get<any>(`${this.uri}/${id}/compras`);
  }

  public getUsuarios():Observable<Usuario[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarUsuario(user:Usuario):Observable<Usuario>{
    return this.http.post<any>(`${this.uri}`,user);
  }

  public encontrarUsuario(id:any):Observable<Usuario>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarUsuario(user:Usuario):Observable<Usuario>{
    return this.http.put<any>(`${this.uri}`,user);
  }

  public eliminarUsuario(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
