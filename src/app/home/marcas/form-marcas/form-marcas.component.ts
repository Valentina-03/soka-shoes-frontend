import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarcaService } from 'src/app/services/marca.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-form-marcas',
  templateUrl: './form-marcas.component.html',
  styleUrls: ['./form-marcas.component.css']
})
export class FormMarcasComponent implements OnInit {

  titulo = 'Agregar Marca';
  boton = 'Agregar Marca';
  id: string | null;
  marcas:any[] = [];

  public form!:FormGroup;

  constructor(
    private marcaService:MarcaService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastS: ToastrService,
    private tokenS:TokenService,

  ) { 
    this.id = aRouter.snapshot.paramMap.get('idMarca');
  }

  ngOnInit(): void {

    this.marcaService.getMarcas().subscribe(data=> this.marcas = data);
    this.cargarToken();
    this.esEditar();
   // this.deshabilitar();
    this.form = this.formBuilder.group({
      idMarca: ['', ],
      nombre: ['', Validators.required],
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
    if (this.id !== null) {
      this.titulo = 'Editar Marca';
      this.boton = 'Editar Marca';
      this.marcaService.encontrarMarca(this.id).subscribe((data) => {
        this.form.setValue({
          idMarca: data.idMarca,
          nombre: data.nombre,
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
      this.marcaService.editarMarca(this.id, this.form.value).subscribe((data) => {
        this.toastS.success('Marca Editada Con Exito!', 'marca Editada',{
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(["/marcas"]);
      });
    } else {
      this.marcaService.guardarMarca(this.form.value).subscribe((data) => {
        this.toastS.success('Marca Agregada Con Exito!', 'Marca Registrada',{
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(["/marcas"]);
      });

    
    }

  }

}
