import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {
  form: FormGroup;
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
  agregarProducto() {
    // Aquí puedes agregar la lógica para procesar los datos del formulario y guardar el producto
    // Por ejemplo:
    const producto = this.form.value;
    console.log(producto);
  }
}
