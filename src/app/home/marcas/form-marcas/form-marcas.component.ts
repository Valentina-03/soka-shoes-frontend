import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-form-marcas',
  templateUrl: './form-marcas.component.html',
  styleUrls: ['./form-marcas.component.css']
})
export class FormMarcasComponent implements OnInit {

  id: number;
  marcas:any[] = [];

  public form!:FormGroup;

  constructor(
    private marcaService:MarcaService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastS: ToastrService

  ) { }

  ngOnInit(): void {

    this.id = Number(this.aRouter.snapshot.paramMap.get('idMarca'))
    //this.crearFormularios()

    this.marcaService.getMarcas().subscribe(marcas=>
      this.marcas = marcas
    )
  }

}
