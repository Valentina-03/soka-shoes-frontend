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
export class ProductosComponent implements OnInit {

  productos:any = [];
  productos_detalles:any = [];
  detalle_seleccionado = [-1, -1];
  usuario:any;
  username = "";

  //Seleccion filtros
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
    this.username= this.token.getUserName();
    this.usuarioService.usuarioPorUsername(this.username).subscribe(usuarioEncontrado=>{
      this.usuario = usuarioEncontrado;
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
      this.prodser.getDetallesProducto(this.productos[0].idProducto).subscribe(detalles =>
        this.productos_detalles[i] = detalles
      );
    }
  }

  setTallas(detalle: any, i:any, j:any)
  {
    if(this.detalle_seleccionado[0] != -1){
      var ant_but = $("#btn-product-"+this.detalle_seleccionado[0]+"-"+this.detalle_seleccionado[1]);
      ant_but.removeClass('btn-product-img-focus');
      ant_but.addClass('btn-product-img');
    }
    this.detalle_seleccionado = [i, j];
    var but = $("#btn-product-"+i+"-"+j);
      but.removeClass('btn-product-img');
      but.addClass('btn-product-img-focus');

    var sel = $("#talla-sel");
    sel.empty();

    var tallas = detalle.tallas;
    for(let i = 0; i<tallas.length; i++){
      var option = $('<option></option>').attr("value", i+1).text(tallas[i].numero);
      sel.append(option);
    }
  }

  agregarACarrito(producto:any)
  {
    console.log("agregando " + producto.idProducto);
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

}
