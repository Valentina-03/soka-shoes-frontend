import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html'
})

export class FormProductComponent implements OnInit {

  categorias:any = [];
  marcas:any = [];
  public form!:FormGroup;

  constructor(
    private categoriaService:CategoriaService,
    private marcaService:MarcaService,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private toastS:ToastrService

    ) { }
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      categoria:['',Validators.required],
      precio:['',Validators.required],
      urlImg:['',Validators.required],
      modelo:['',Validators.required],
      cantidad:['',Validators.required],
      descripcion:['',Validators.required],
      marca:['',Validators.required],
    })

    this.categoriaService.consultarTallas().subscribe(categorias=>{
      this.categorias = categorias;
    })
    
    this.marcaService.consultarMarcas().subscribe(marcas=>{
      this.marcas = marcas;
    })
  }
  eliminar(producto:any){
    
  }
  onSubmit(){
    this.productoService.guardarProducto(this.form.value).subscribe(async producto=>{
      this.toastS.success('¡Producto registrado!', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
      await new Promise(f => setTimeout(f, 1500));
      window.location.reload();
    })
  }

}
