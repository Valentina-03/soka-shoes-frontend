import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlName } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {
  form: FormGroup;
  categorias : any[] = [];
  categoriaService: CategoriaService;
  id: number;
  
  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idProducto: [''],
      nombre: [''],
      descripcion: ['']
    });
  }
  guardarCategoria() {
    if (this.form.valid) {
      const producto = this.form.value;
      this.categorias.push(producto); // Agregar la categoría al array de categorías
      this.form.reset(); // Reiniciar el formulario después de guardar la categoría
    }
}

}