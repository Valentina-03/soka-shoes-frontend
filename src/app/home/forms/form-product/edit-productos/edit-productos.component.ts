import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit-productos.component.html',
  styleUrls: ['./edit-productos.component.css']
})
export class EditProductosComponent implements OnInit {

  categorias:any = [];
  marcas:any = [];
  id: any
  public form!:FormGroup;

  constructor(
    private categoriaService:CategoriaService,
    private marcaService:MarcaService,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private aRouter: ActivatedRoute,
    private toastS:ToastrService,
    private router: Router

    ) { }
  
  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('idProducto');
    this.form = this.formBuilder.group({
      idProducto:['',Validators.required],
      categoria:['',Validators.required],
      precio:['',Validators.required],
      urlImg:['',Validators.required],
      modelo:['',Validators.required],
      cantidad:['',Validators.required],
      descripcion:['',Validators.required],
      marca:['',Validators.required],
      estado:['',Validators.required],
    });
    this.productoService.encontrarProducto(this.id).subscribe(producto => {
      
      this.form.setValue({
      idProducto: producto.idProducto,
      categoria: producto.categoria.idCategoria,
      precio: producto.precio,
      urlImg: producto.urlImg,
      modelo: producto.modelo,
      cantidad:producto.cantidad,
      descripcion: producto.descripcion,
      marca: producto.marca.idMarca,
      estado:producto.estado
      });
    });

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
    this.productoService.editarProducto(this.form.value).subscribe(async producto=>{
      console.log(producto);
      this.toastS.success('¡Producto editado!', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
      await new Promise(f => setTimeout(f, 1500));
      this.router.navigate(["/listaproductos"]);
    });
  }
}
