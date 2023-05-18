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

  public getProductos(id:number):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${id}/productos`);
  }

  public getCntProductos(id:number):Observable<number>{
    return this.http.get<any>(`${this.uri}/${id}/cntProductos`);
  }

  public getColors():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public encontrarColor(id:number):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

}
