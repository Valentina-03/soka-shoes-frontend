import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  usuarios:any = [];

  constructor( 
  private usuarioService:UsuarioService,
  private router: Router,
  private toastS: ToastrService) { }
 
  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios=> this.usuarios = usuarios);

  }
  
  editar(id:any){
    this.router.navigateByUrl("/editarUsuario/"+id);
  }

  agregar(){
    this.router.navigateByUrl("/nuevoempleado");
  }

}
