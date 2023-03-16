import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ColorService } from 'src/app/services/color.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TallaService } from 'src/app/services/talla.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  
  productos:any = [];
  tallas:any = [];
  colores:any = [];
  marcas:any = [];
  carrito:any=null;
  cantidadMarcas: any = [];
  cantidadTallas: any = [];
  cantidadColores: any = [];
  usuario:any;
  totalActivos = 0;
  username = "";

  constructor(
    private pser: ProductoService,
    private caser: CarritoService,
    private tser: TallaService,
    private cser: ColorService,
    private mser: MarcaService,
    private toastr: ToastrService,
    private token:TokenService,
    private usuarioService:UsuarioService

  ){}


  ngOnInit(): void {

    this.username= this.token.getUserName();
    this.usuarioService.usuarioPorUsername(this.username).subscribe(usuarioEncontrado=>{
      this.usuario = usuarioEncontrado;
      this.usuarioService.carritoDeUsuario(this.usuario.id_Usuario).subscribe(carrito=>{
        this.carrito = carrito;
      })
    });

    this.pser.consultarProductos().subscribe( productos => {
      this.productos = productos;

      for (let i = 0; i < productos.length; i++) {
        if(productos[i].estado==true){
          this.totalActivos++;
        }
        
      }

    });
    this.tser.consultarTallas().subscribe( tallas => {
      this.tallas = tallas;
      this.cantidadPorTallas();
    });
    this.cser.consultarColores().subscribe( colores => {
      this.colores = colores;
      this.cantidadPorColores();
    });
    this.mser.consultarMarcas().subscribe( marcas => {
      this.marcas = marcas;
      this.cantidadPorMarcas();
    });
  }
  cantidadPorMarcas(){
    for (let i = 0; i < this.marcas.length; i++) {
      this.mser.consultarCantidad(this.marcas[i].idMarca).subscribe( cantidad => {
        this.cantidadMarcas[i] = cantidad;
      })
    }
  }
  cantidadPorTallas(){
      for (let i = 0; i < this.tallas.length; i++) {
        this.tser.consultarCantidad(this.tallas[i].idTalla).subscribe( cantidad => {
          this.cantidadTallas[i] = cantidad;
        })
      }
    }
    cantidadPorColores(){
      for (let i = 0; i < this.colores.length; i++) {
        this.cser.consultarCantidad(this.colores[i].idColor).subscribe( cantidad => {
          this.cantidadColores[i] = cantidad;
        })
      }
    }


  

  agregarACarrito(producto:any){
    
    
    if(this.estaEnCarrito(producto.idProducto)){
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
    })
    
  }

  estaEnCarrito(idProducto:any):boolean{
    for (let i = 0; i <this.carrito.length; i++) {
      if(this.carrito[i].producto.idProducto == idProducto){
        return true;
      }      
    }
    return false;
  }

}
