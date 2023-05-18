import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import * as global from 'global'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {

  uri = `${global.url}/detproducto`;
  constructor(private http:HttpClient) { }

  public getByAll(idProducto:number, idColor:string, idTalla:number):Observable<any>{
    return this.http.get<any>(`${this.uri}/${idProducto}/${idColor}/${idTalla}`)
  }

  public getDetalles():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public encontrarDetalle(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public eliminarDetalle(id:number):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
