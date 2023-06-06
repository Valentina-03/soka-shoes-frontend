import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email = "";
  usuario!:any;
  isLogged = false;
  isLoginFail = false;
  cantidadTotal=0;
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private token:TokenService,
    private usuarioService:UsuarioService

    ) { }

  ngOnInit(): void {
    if(this.token.getToken() != null){
      if(this.token.getAuthorities().length>1){
        this.isAdmin=true;
      }
      this.email= this.token.getEmail();
      if (this.token.getToken()) {
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.token.getAuthorities();
      }
      this.usuarioService.usuarioPorEmail(this.email).subscribe(usuarioEncontrado=>{
        this.usuario = usuarioEncontrado;
      })
    }
  }
}