import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  uri = `${global.url}/marca`;
  constructor(private http:HttpClient) { }

  public consultarMarcas():Observable<any>{
    return this.http.get<any>(`${this.uri}`);
  }

  public consultarCantidad(idmarca: any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${idmarca}/cantidad`);
  }

}
