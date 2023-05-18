import { ToastrService } from 'ngx-toastr';
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
export class AuthRegistroComponent implements OnInit
{
  nuevoUsuario?: NuevoUsuario;
  username=""
  email=""
  password=""
  password_conf=""
  errMsj?: string;
  isLogged = false;

  constructor(
    private toastr:ToastrService,
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
    if(this.password != this.password_conf){
      this.toastr.error("Las contraseñas no conciden", 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      }); return;
    }
    this.nuevoUsuario = new NuevoUsuario(this.username, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
}
