import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ColorService } from 'src/app/services/color.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TallaService } from 'src/app/services/talla.service';
import { DetalleProductoService } from 'src/app/services/detalle_producto.service';


@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductComponent implements OnInit
{
  id: number; colores: any[] =[]
  detalles:any[] = []; detalle:any = undefined
  categorias:any[] = []; marcas:any[] = []
  tallas: any[] = [];

  public form!:FormGroup;

  constructor(
    private categoriaService:CategoriaService,
    private marcaService:MarcaService,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private tallaService: TallaService,
    private colorService: ColorService,
    private detalleProductoService: DetalleProductoService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastS: ToastrService
    ) { }

  ngOnInit(): void
  {
    this.id = Number(this.aRouter.snapshot.paramMap.get('idProducto'))
    this.crearFormularios()

    this.categoriaService.getCategorias().subscribe(categorias=>
      this.categorias = categorias
    )
    this.marcaService.getMarcas().subscribe(marcas=>
      this.marcas = marcas
    )

    this.tallaService.getTallas().subscribe(tallas=>
      this.tallas = tallas
    )
  }

  submitDetalle(){
    if($("#img-edit").val() == '' || $("#img-edit").val() == null){
      this.toastS.error('Debe ingresar una url', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      }); return;
    }

    let id = this.detalles.lastIndexOf(this.detalle)
    this.detalle.url = $("#img-edit").val()
    this.detalle.cantidad = 0;

    for(let i=0; i<this.detalle.tallas.length; i++){
      if(Number($("#cnt-edit-"+i).val()) <= 0){
        this.toastS.error('La cantidad de la talla '+this.detalle.tallas[i].first.numero+' no es válida', '', {
          timeOut: 4000, positionClass: 'toast-top-center'
        }); return;
      }
      this.detalle.tallas[i].second = Number($("#cnt-edit-"+i).val())
      this.detalle.cantidad += this.detalle.tallas[i].second
    }
    this.detalles[id] = this.detalle;
    this.ocultarDetalle()

  }

  eliminar(id:any){
    Swal.fire({
      title: '¿Está seguro?', text: "¿Está seguro que desea eliminar este producto?", icon: 'warning',
      showCancelButton: true, cancelButtonColor: '#d33', cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed){
        let talla = Number($("#talla-"+id).val())
        this.detalleProductoService.getByAll(this.id,  this.detalles[id].color.idColor, this.detalles[id].tallas[talla].first.idTalla).subscribe(detalle => {
          if(detalle != null)
            this.detalleProductoService.eliminarDetalle(id.idDetalle).subscribe()
        })
        this.detalles[id].cantidad -= this.detalles[id].tallas[talla].second
        this.detalles[id].tallas.splice(Number($("#talla-"+id).val()), 1)
        if(this.detalles[id].tallas.length == 0){
          this.colores.push(this.detalles[id].color)
          this.detalles.splice(id, 1)
        }

        this.toastS.success('¡Producto eliminado!', '', {
          timeOut: 1000, positionClass: 'toast-top-center'
        })
      }
    })
  }

  onSubmit(){
    if(this.id == 0){
      this.productoService.guardarProducto(this.form.value, this.detalles).subscribe(async producto=>{
        Swal.fire(
          'Correcto',
          'Producto Agregado con Éxito',
          'success'
        ).then(function () {
          window.location.reload();
        })
      });
    }else{
      this.productoService.editarProducto(this.form.value, this.detalles).subscribe(async producto=>{
        Swal.fire(
          'Correcto',
          'Producto Editado con Éxito',
          'success'
        ).then(function () {
          window.location.reload();
        })
      });
    }

    this.router.navigate(["/listaproductos"]);
  }

  mostrarDetalle(id:number)
  {
    if(id == -1){
      $("#aggDetail-modal").css("display", "block"); $("#first").show(); $("#second").hide()
      $("#color-box").css("background-color", "#"+this.colores[0].idColor); $("#color-sel").val(0)
      return
    }
    this.detalle = this.detalles[id]
    $("#editDetail-modal").css("display", "block")
    $("#first-edit").show(); $("#second-edit").hide()
    if(this.detalle.tallas.length == this.tallas.length) $('#new-talla').prop('disabled', true);
    else $('#new-talla').prop('disabled', false);
    $("#img-edit").val(this.detalle.url)
  }

  ocultarDetalle(){
    $("#aggDetail-modal").css("display", "none")
    $("#editDetail-modal").css("display", "none")
    this.detalle = undefined;
    $("#img-add").val(''); $("#color-sel").val(0)
  }

  newTalla(id:number){
   if(id == 0){
      $('#other-talla-edit').prop('disabled', false); $('#talla-sel-edit').empty()
      $("#first-edit").hide(); $("#second-edit").show(); $("#cantidad-edit").val(0);
      for(let i=0; i<this.tallas.length; i++){
        let existe = false
        for(let j=0; j<this.detalle.tallas.length; j++)
          if(this.tallas[i].idTalla == this.detalle.tallas[j].first.idTalla) existe = true
        if(!existe){
          $('#talla-sel-edit').append($('<option>', {
            value: i,
            text : this.tallas[i].numero
          }));
        }
      }
      return;
    }

    if(id == 2){
      $("#first-edit").show(); $("#second-edit").hide()
      this.detalle.tallas.sort()
      if($("#talla-sel-edit").val() == null)
        return
    }
    if(Number($("#cantidad-edit").val()) <= 0){
      this.toastS.error('La cantidad no es válida', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      }); return;
    }

    if($("#talla-sel-edit").val() == null){
      this.toastS.error('Debe seleccionar una talla', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      }); return;
    }

    let i = Number($("#talla-sel-edit").val())
    var talla = {
      first: this.tallas[i],
      second: $("#cantidad-edit").val()
    };

    $("#talla-sel-edit option[value="+i+"]").remove(); $("#talla-sel-edit").val("")
    this.detalle.tallas.push(talla); this.detalle.cantidad += Number($("#cantidad-edit").val())
    $("#cantidad-edit").val(0);
    if( $('#talla-sel-edit').has('option').length <= 0 ) $('#other-talla-edit').prop('disabled', true)
  }

  addTalla(id:number){
    if(id == 0){
       if($("#img-add").val() == '' || $("#img-add").val() == null){
         this.toastS.error('Debe ingresar una url', '', {
           timeOut: 3000, positionClass: 'toast-top-center'
         }); return;
       }
       this.detalle = {
         idProducto: this.id,
         url: $("#img-add").val(),
         color: this.colores[Number($("#color-sel").val())],
         cantidad: 0,
         tallas: []
       }
       $('#other-talla').prop('disabled', false)
       $("#first").hide(); $("#second").show(); $("#cantidad").val(0); $("#img-add").val(''); $("#color-sel").val(0)
       $('#talla-sel').empty()
       $.each(this.tallas, function (i, item) {
         $('#talla-sel').append($('<option>', {
             value: i,
             text : item.numero
         }));
       });
       return;
     }

     if(id == 2){
       $("#aggDetail-modal").css("display", "none")
       if($("#talla-sel").val() == null){
         this.detalles.push(this.detalle)
         return
       }
       this.colores.splice(this.colores.lastIndexOf(this.detalle.color), 1)
     }
     if(Number($("#cantidad").val()) <= 0){
       this.toastS.error('La cantidad no es válida', '', {
         timeOut: 3000, positionClass: 'toast-top-center'
       }); return;
     }

     if($("#talla-sel").val() == null){
       this.toastS.error('Debe seleccionar una talla', '', {
         timeOut: 3000, positionClass: 'toast-top-center'
       }); return;
     }

     let i = Number($("#talla-sel").val())
     var talla = {
       first: this.tallas[i],
       second: $("#cantidad").val()
     };

     $("#talla-sel option[value="+i+"]").remove(); $("#talla-sel").val("")
     this.detalle.tallas.push(talla); this.detalle.cantidad += Number($("#cantidad").val())
     $("#cantidad").val(0);
     if( $('#talla-sel').has('option').length <= 0 ) $('#other-talla').prop('disabled', true)
     if(id == 2) this.detalles.push(this.detalle)
   }


  crearFormularios()
  {
    //Inicializar Formularios
    this.form = this.formBuilder.group({
      idProducto:[''],
      nombre:['',Validators.required],
      descripcion:[''],
      precio: new FormControl('',[Validators.required, Validators.min(1000)]),
      cantidad:[''],
      estado:[''],
      createdAt: [''],
      marca:['',Validators.required],
      categoria:['',Validators.required]
    });

    //Cargar Valores
    if(this.id == 0){
      this.colorService.getColors().subscribe(colores=>this.colores = colores)
      $("#spur-card-title").text("Agregar Producto")
    }
    else{
      $("#spur-card-title").text("Editar Producto")
      this.productoService.encontrarProducto(this.id).subscribe(producto => {
        this.cargarDetalles()
        this.form.patchValue({
          idProducto: producto.idProducto,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          marca: producto.marca.idMarca,
          categoria: producto.categoria.idCategoria,
          estado: producto.estado,
          createdAt: producto.createdAt,
          cantidad: producto.cantidad
        });
      });
    }
  }

  cargarDetalles(){
    this.productoService.getDetallesProducto(this.id).subscribe(detalles => {
      this.detalles = detalles
      this.colorService.getColors().subscribe(colores=>{
        for(let i=0; i<colores.length; i++){
          let existe = false
          for(let j=0; j<this.detalles.length; j++){
            if(this.detalles[j].color.idColor == colores[i].idColor) existe = true
          }
          if(!existe) this.colores.push(colores[i])
        }
      })
    })
  }

  cancelar(){
    this.router.navigate(["/listaproductos"])
  }

  onSelectTalla(i:number) {
    let id = $("#talla-"+i).val()
    $("#cnt-det-"+i).text(this.detalles[i]?.tallas[Number(id)]?.second)
  }

  onSelectColor(event: Event) {
    let id = Number((<HTMLSelectElement>event.target).value)
    $("#color-box").css("background-color", "#"+this.colores[id].idColor)
  }
}
