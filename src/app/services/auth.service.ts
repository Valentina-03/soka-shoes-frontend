import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/dto/jwt-dto';
import { LoginUsuario } from '../models/dto/login-usuario';
import { NuevoUsuario } from '../models/dto/nuevo-usuario';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  authURL = `${global.url}/auth/`;

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }

}
