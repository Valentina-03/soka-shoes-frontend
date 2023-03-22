import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ColorService } from 'src/app/services/color.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TallaService } from 'src/app/services/talla.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit
{
  //Usuario
  usuario:any;
  username = "";
  email  = "";

  //Cargar productos y detalles
  productos:any = [];
  productos_detalles:any = [];
  detalle_seleccionado = [-1, -1];

  //Cargar filtros
  allMarcas:any = [];
  allCategorias:any = [];
  allColores:any = [];
  allTallas:any = [];

  constructor(
    private prodser: ProductoService,
    private usuarioService:UsuarioService,
    private toastr: ToastrService,
    private token:TokenService,

    private mser: MarcaService,
    private catser: CategoriaService,
    private colser: ColorService,
    private tser: TallaService,)
    {}


  ngOnInit(): void {
    this.username= this.token.getEmail();
    this.usuarioService.usuarioPorEmail(this.username).subscribe(usuarioEncontrado=>{
      this.usuario = usuarioEncontrado;
      this.username = usuarioEncontrado.username;
      this.email = usuarioEncontrado.email;
    });

    this.prodser.getProductos().subscribe(productos => {
      this.productos = productos;
      this.cargarDetallesProductos();
    });
    this.mser.getMarcas().subscribe(marcas =>
      this.allMarcas = marcas
    );
    this.catser.getCategorias().subscribe(categorias =>
      this.allCategorias = categorias
    );
    this.colser.getColors().subscribe(colores =>
      this.allColores = colores
    );
    this.tser.getTallas().subscribe(tallas =>
      this.allTallas = tallas
    );
  }

  cargarDetallesProductos(){
    for(let i = 0; i<this.productos.length; i++){
      this.prodser.getDetallesProducto(this.productos[i].idProducto).subscribe(detalles =>
        this.productos_detalles[i] = detalles
      );
    }
  }

  setTallas(detalle: any, i:any, j:any)
  {
    if(this.detalle_seleccionado[0] != -1){
      $("#prod-img-"+this.detalle_seleccionado[0]).attr("src",this.productos_detalles[this.detalle_seleccionado[0]][0].url).addClass("product-image");
      $("#prod-agg-btn-"+this.detalle_seleccionado[0]).prop('disabled', true);
      $("#prod-col-btn-"+this.detalle_seleccionado[0]+"-"+this.detalle_seleccionado[1]).removeClass('btn-product-img-focus') .addClass('btn-product-img');
      $("#prod-talla-sel-"+this.detalle_seleccionado[0]).empty();
    }
    this.detalle_seleccionado = [i, j];
    $("#prod-agg-btn-"+i).prop('disabled', false);
    $("#prod-img-"+i).attr("src",this.productos_detalles[i][j].url).addClass("product-image");
    $("#prod-col-btn-"+i+"-"+j).removeClass('btn-product-img').addClass('btn-product-img-focus');

    var sel = $("#prod-talla-sel-"+i).empty();
    var tallas = detalle.tallas;
    for(let i = 0; i<tallas.length; i++)
      sel.append($('<option></option>').attr("value", i+1).text(tallas[i].numero));
  }

  agregarACarrito(producto:any)
  {
    console.log("agregando " + producto);
    /*if(this.estaEnCarrito(producto.idProducto)){
      this.toastr.warning('¡Producto ya registrado!', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }
    var carrito = {
    "cantidad": 1,
    "producto":producto,
    "usuario":this.usuario
    }
    this.caser.guardarCarrito(carrito).subscribe(async data=>{

      this.toastr.success('¡Producto agregado con exito!', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
      await new Promise(f => setTimeout(f, 1500));
      window.location.reload();
    })*/

  }

  estaEnCarrito(idProducto:any):boolean{
    return false;
    /*for (let i = 0; i <this.carrito.length; i++) {
      if(this.carrito[i].producto.idProducto == idProducto){
        return true;
      }
    }
    return false;*/
  }

  toggleClick(id:any)
  {
    $("#"+id).toggle();
    if(id == "filter-talla"){
      $("#filter-talla-min").val(0);
      $("#filter-talla-max").val(0);
      return;
    }
    if(id == "filter-precio"){
      $("#filter-precio-min").val(0);
      $("#filter-precio-max").val(0);
      return;
    }
    $("[name= '"+ id + "']").prop("checked", false);
  }

  filtrar()
  {
    //var filter:any = [{}, {}, {}, {}, {}];
    var filter:any = [[]];
    filter[0] = []; filter[1] = []; filter[2] = []; filter[3] = []; filter[4] = [];
    if($("#filter-marca").is(':visible')) {
      let i = 0;
      $("[name= 'filter-marca']").each(function () {
        if ($(this).is(':checked')) {
          filter[0][i++] = $(this).val();
        }
      });
    }
    if($("#filter-cat").is(':visible')) {
      let i = 0;
      $("[name= 'filter-cat']").each(function () {
        if ($(this).is(':checked')) {
          filter[1][i++] = $(this).val();
        }
      });
    }
    if($("#filter-color").is(':visible')) {
      let i = 0;
      $("[name= 'filter-color']").each(function () {
        if ($(this).is(':checked')) {
          filter[2][i++] = $(this).val();
        }
      });
    }
    if($("#filter-talla").is(':visible')) {
      if($("#filter-talla-min").val() != 0 && $("#filter-talla-max").val() != 0){
        filter[3][0] = $("#filter-talla-min").val();
        filter[3][1] = $("#filter-talla-max").val();
      }
    }
    if($("#filter-precio").is(':visible')) {
      if($("#filter-precio-min").val() != 0 && $("#filter-precio-max").val() != 0){
        alert($("#filter-precio-max").val());
        filter[4][0] = $("#filter-precio-min").val();
        filter[4][1] = $("#filter-precio-max").val();
      }
    }
    this.productos = this.prodser.getProductosFiltrados(filter).subscribe(productos => {
      this.productos = productos;
      this.cargarDetallesProductos();
    });
  }

  cleanFilter(){
    if($("#filter-marca").is(':visible')) this.toggleClick("filter-marca");
    if($("#filter-cat").is(':visible')) this.toggleClick("filter-cat");
    if($("#filter-color").is(':visible')) this.toggleClick("filter-color");
    if($("#filter-talla").is(':visible')) this.toggleClick("filter-talla");
    if($("#filter-precio").is(':visible')) this.toggleClick("filter-precio");

    this.prodser.getProductos().subscribe(productos => {
      this.productos = productos;
      this.cargarDetallesProductos();
    });
  }
}
