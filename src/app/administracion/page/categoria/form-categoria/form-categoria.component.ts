import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {

  constructor(
    private formularioCategoria: FormCategoriaComponent
    ) { }

  ngOnInit(): void {
    
  }

}
