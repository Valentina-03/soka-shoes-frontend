import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  uri = `${global.url}/color`;
  constructor(private http:HttpClient) { }

  public getProductos(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/productos`);
  }

  public getCntProductos(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/cntProductos`);
  }

  public getColors():Observable<any>{
    return this.http.get<any>(`${this.uri}`);
  }

  public guardarColor(color:any):Observable<any>{
    return this.http.post<any>(`${this.uri}`, color);
  }

  public encontrarColor(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editarColor(color:any):Observable<any>{
    return this.http.put<any>(`${this.uri}`,color);
  }

  public eliminarColor(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
