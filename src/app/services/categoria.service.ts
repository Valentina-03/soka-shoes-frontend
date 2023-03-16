import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  uri = `${global.url}/categoria`;
  constructor(private http:HttpClient) { }

  public consultarTallas():Observable<any>{
    return this.http.get<any>(`${this.uri}`);
  }
}
