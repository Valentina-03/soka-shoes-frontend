import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-auth-registro',
  templateUrl: './auth-registro.component.html',
  styleUrls: ['./auth-registro.component.css']
})
export class AuthRegistroComponent implements OnInit {


  nuevoUsuario?: NuevoUsuario;
  nombreUsuario="";
  email=""
  password=""
  errMsj?: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        // this.toastr.success('Cuenta Creada', 'OK', {
        //   timeOut: 3000, positionClass: 'toast-top-center'
        // });
        console.log("aaa");
        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        // this.toastr.error(this.errMsj, 'Fail', {
        //   timeOut: 3000,  positionClass: 'toast-top-center',
        // });
        // console.log(err.error.message);
      }
    );
  }

}
