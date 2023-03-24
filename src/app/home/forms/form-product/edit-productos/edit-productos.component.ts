import { Producto } from './../../../../models/Producto';
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
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      precio:['',Validators.required],
      cantidad:['',Validators.required],
      marca:['',Validators.required],
      categoria:['',Validators.required]
    });

    this.categoriaService.getCategorias().subscribe(categorias=>
      this.categorias = categorias
    )

    this.marcaService.getMarcas().subscribe(marcas=>
      this.marcas = marcas
    )

    this.productoService.encontrarProducto(this.id).subscribe(producto =>
    {
      this.form.patchValue({
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        cantidad:producto.cantidad,
        marca: producto.marca.idMarca,
        categoria: producto.categoria.idCategoria
      });
    });
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
