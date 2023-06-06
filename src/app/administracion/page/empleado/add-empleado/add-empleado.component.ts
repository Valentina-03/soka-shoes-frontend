import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.css']
})

export class AddEmpleadoComponent implements OnInit {
  titulo = 'Agregar Empleado';
  boton = 'Agregar Empleado';
  idPer: string | null;
  id: string | null;
  usuarios:any [] = [];
public form!:FormGroup;

  constructor(
  private usuarioService:UsuarioService,
  private router: Router,
  private toastS: ToastrService,
  private aRouter: ActivatedRoute,
  private formBuilder: FormBuilder,
  private tokenS:TokenService,


  ) {

    this.id = aRouter.snapshot.paramMap.get('idCargo');

   }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios=> this.usuarios = usuarios);
    this.cargarToken();
    this.esEditar();
   // this.deshabilitar();
    this.form = this.formBuilder.group({
      idCargo: ['', ],
      estado: ['', Validators.required],
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25)
      ])],
      descripcion: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(200)
        ])],
      sueldo: ['', Validators.compose([
        Validators.required,
        Validators.min(10000),
        Validators.max(9999999),
      ])],
    });
  }

  public cargarToken() {
    if (this.tokenS.getToken()) {
      if(this.tokenS.getAuthorities().length < 2){
      this.router.navigateByUrl("/inicio");
      }
    } else {
      this.router.navigateByUrl("/inicio");
    }
  }

  esEditar() {
   
  }

  public enviarData() {
   
  }

}
