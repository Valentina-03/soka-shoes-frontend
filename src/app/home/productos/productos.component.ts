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
  usuario: any;
  email  = "";

  //Cargar productos y detalles
  productos:any = []
  detalles:any[] = []
  selected = [-1, -1]

  //Cargar filtros
  allMarcas:any = []
  allCategorias:any = []
  allColores:any = []
  allTallas:any = []
  precio:any = []
  talla:any = []

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
    this.email= this.token.getEmail();
    this.usuarioService.usuarioPorEmail(this.email).subscribe(usuarioEncontrado=>{
      this.usuario = usuarioEncontrado
      this.email = usuarioEncontrado.email
    });

    this.prodser.getProductos().subscribe(productos => {
      this.productos = productos
      this.cargarDetallesProductos()
    })

    this.mser.getMarcas().subscribe(marcas => this.allMarcas = marcas);
    this.catser.getCategorias().subscribe(categorias => this.allCategorias = categorias);
    this.colser.getColors().subscribe(colores => this.allColores = colores);
    this.tser.getTallas().subscribe(tallas => this.allTallas = tallas);
  }

  cargarDetallesProductos(){
    for(let i = 0; i<this.productos.length; i++)
      this.prodser.getDetallesProducto(this.productos[i].idProducto).subscribe(detalles => this.detalles[i] = detalles)
  }

  agregarACarrito(id: any)
  {
    var color = this.detalles[this.selected[0]][this.selected[1]].color.idColor;
    var talla = $("#prod-talla-sel-"+ this.selected[0]).val();

    this.prodser.getDetalle(id, color, talla, 1).subscribe(detalle =>{
      if(detalle == null){
        this.toastr.error('Lo sentimos! Este producto no se encuentra disponible', 'No disponible', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); return
      }
      else{
        this.usuarioService.addCarrito(this.usuario.idUsuario, detalle).subscribe(data =>{
          this.toastr.success('¡Producto agregado con exito!', '', {
            timeOut: 3000, positionClass: 'toast-top-center'
          })
        });
      }
    });
  }

  filtrar(){
    //var filter:any = [{}, {}, {}, {}, {}];
    var filter:any [] = []; filter[0] = [], filter[1] = [], filter[2] = [], filter[3] = [], filter[4]  = []
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
      filter[3] = this.talla
      console.log(filter[3]);
    }
    if($("#filter-precio").is(':visible')) {
      filter[4] = this.precio
      console.log(filter[4]);


      /*if($("#filter-precio-min").val() != 0 && $("#filter-precio-max").val() != 0){
        alert($("#filter-precio-max").val());
        filter[4][0] = $("#filter-precio-min").val();
        filter[4][1] = $("#filter-precio-max").val();
      }*/
    }
    console.log(filter);
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

  setTallas(detalle: any, i:any, j:any)
  {
    if(this.selected[0] != -1){
      $("#prod-img-"+this.selected[0]).attr("src",this.detalles[this.selected[0]][0].url).addClass("product-image");
      $("#prod-agg-btn-"+this.selected[0]).prop('disabled', true);
      $("#prod-col-btn-"+this.selected[0]+"-"+this.selected[1]).removeClass('btn-product-img-focus') .addClass('btn-product-img');
      $("#prod-talla-sel-"+this.selected[0]).empty();
    }
    this.selected = [i, j];
    $("#prod-agg-btn-"+i).prop('disabled', false);
    $("#prod-img-"+i).attr("src",this.detalles[i][j].url).addClass("product-image");
    $("#prod-col-btn-"+i+"-"+j).removeClass('btn-product-img').addClass('btn-product-img-focus');

    var sel = $("#prod-talla-sel-"+i).empty();
    var tallas = detalle.tallas;
    for(let i = 0; i<tallas.length; i++)
      sel.append($('<option></option>').attr("value", tallas[i].first.idTalla).text(tallas[i].first.numero));
  }

  toggleClick(id:any) {
    $("#"+id).toggle();
    if(id == "filter-talla"){
      this.talla = [30, 50]
      return;
    }
    if(id == "filter-precio"){
      this.precio = [30000, 500000]
      return;
    }
    $("[name= '"+ id + "']").prop("checked", false);
  }
}
