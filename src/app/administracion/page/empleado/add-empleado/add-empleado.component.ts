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

    this.id = aRouter.snapshot.paramMap.get('idUsuario');

   }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(data=> this.usuarios = data);
    this.cargarToken();
    this.esEditar();
   // this.deshabilitar();
    this.form = this.formBuilder.group({
      idUsuario: ['', ],
      email: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      username: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(200)
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
    // this.aRouter.snapshot.paramMap("idCargo");
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this.boton = 'Editar Empleado';
      this.usuarioService.encontrarUsuario(this.id).subscribe((data) => {
        this.form.setValue({
          idUsuario: data.idUsuario,
          email: data.email,
          password: data.password,
          username: data.username,
        });
      });
    }
  }

  public enviarData() {
   
    if (!this.form.valid) {
      this.toastS.error('¡Datos incorrectos!', 'ERROR', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }
    if (this.id !== null) {
      this.usuarioService.editarUsuario(this.id, this.form.value).subscribe((data) => {
        this.toastS.success('Usuario Editado Con Exito!', 'usuario Editado',{
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(["/empleados"]);
      });
    } else {
      this.usuarioService.post(this.form.value).subscribe((data) => {
        this.toastS.success('Usuario Agregado Con Exito!', 'Usuario Registrado',{
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(["/empleados"]);
      });

    
    }

  }

}
