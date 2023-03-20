import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  uri = `${global.url}/transaccion`
  constructor(private http:HttpClient){}

  public getTransacciones():Observable<any>{
    return this.http.get<any>(`${this.uri}`);
  }
}
