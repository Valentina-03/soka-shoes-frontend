import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/services/token.service';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})

export class FormCategoriaComponent implements OnInit {
  titulo = 'Agregar Categoria';
  boton = 'Agregar Categoria';
  id: string | null;
  categorias:any [] = [];

public form!:FormGroup;

  constructor(
  private categoriaService: CategoriaService,
  private router: Router,
  private toastS: ToastrService,
  private aRouter: ActivatedRoute,
  private formBuilder: FormBuilder,
  private tokenS:TokenService,


  ) {

    this.id = aRouter.snapshot.paramMap.get('idCategoria');

   }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(data=> this.categorias = data);
    this.cargarToken();
    this.esEditar();
   // this.deshabilitar();
    this.form = this.formBuilder.group({
      idCategoria: [''],
      nombre:[''],
      descripcion: [''],
    
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
      this.titulo = 'Editar Categoria';
      this.boton = 'Editar Categoria';
      this.categoriaService.encontrarCategoria(this.id).subscribe((data) => {
        this.form.setValue({
          idCategoria: data.idCategoria,
          nombre: data.nombre,
          descripcion : data.descripcion,
          
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
      this.categoriaService.editarCategoria(this.id, this.form.value).subscribe((data) => {
        this.toastS.success('Categoria Editada Con Exito!', 'categoria Editada  ',{
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(["/categorias"]);
      });
    } else {
      this.categoriaService.guardarCategoria(this.form.value).subscribe((data) => {
        this.toastS.success('Categoria Agregada Con Exito!', 'Categoria Registrada',{
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(["/categorias"]);
      });

    
    }

  }

}
