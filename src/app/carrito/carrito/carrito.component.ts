import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { CompraService } from 'src/app/services/compra.service';
import * as crypto from "crypto-js";

import * as global from 'global'
import { UsuarioService } from 'src/app/services/usuario.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit {

  carrito:any = [];
  total!:number;
  uri = global.url_front;
  descripcion= "";

  // Variables Payu ==============================================
  referenciaUnic = this.generarReferencia();
  iva = 0.19;
  moneda = "COP";
  apikey = "yn1jslEAEe809I0BVfHp0VOUIW";
 
  idMercado = "953228";
  idCuenta = "960860";

  email = "genesisd@gmial.com"
  nombrePersona = "Genesis";
  idUsuario = "116";

  url = `https://sokashoes-back.herokuapp.com/pagos/confirmacion`;

  //Variables Payu test

  // test =================================================================
  idCuentaTest = "512321";
  apikeyTest= "4Vj8eK4rloUd272L48hsrarnUA";

  firmaElectronicaTest!:string;
  firmaElectronicaMD5Test!:string;
  
  firmaElectronica!:string;
  firmaElectronicaMD5!:string;
  // test =================================================================

  username = "";
  usuario!:any;

  constructor(
    private usuarioService:UsuarioService,
    private compraService: CompraService,
    private carritoService: CarritoService,
    private token:TokenService,
    private toastS:ToastrService

    ) { }

  ngOnInit(): void {
    this.username= this.token.getUserName();

    this.usuarioService.usuarioPorUsername(this.username).subscribe(usuarioEncontrado=>{
     this.usuario = usuarioEncontrado;

     this.usuarioService.carritoDeUsuario(this.usuario.id_Usuario).subscribe(carritos=>{
      this.carrito = carritos;
      this.calcularTotal();
      this.actializarFirma();
    })

    })

    
  }
  
   cargarDatos(form:any){
    
    var compra= {
      "idCompra":this.referenciaUnic,
      "totalCompra":this.total,
      "estado":"PENDIENTE"
    }
    this.carritoService.cargarCarritos(this.carrito).subscribe(data=>{
    })
  
    this.compraService.guardarCompra(compra,this.usuario.id_Usuario).subscribe(async data=>{
      this.toastS.success('¡Compra registrada!', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
      await new Promise(f => setTimeout(f, 1500));
      window.location.reload();
      form.submit()
    })
    
  }


  actializarFirma(){
    this.firmaElectronica = `${this.apikey}~${this.idMercado}~${this.referenciaUnic}~${this.total}~${this.moneda}`;
    this.firmaElectronicaMD5 = crypto.MD5(this.firmaElectronica).toString();

    this.firmaElectronicaTest = `${this.apikeyTest}~508029~${this.referenciaUnic}~${this.total}~${this.moneda}`;
    this.firmaElectronicaMD5Test = crypto.MD5(this.firmaElectronicaTest).toString();
    this.generarDescripcion()
    
  }

  generarDescripcion(){
    let desc = "Pago de ";
    for (let i = 0; i < this.carrito.length; i++) {
      if((i+1)==this.carrito.length){
        desc+=` (${this.carrito[i].cantidad}) ${this.carrito[i].producto.modelo}.`;
      }else{
        desc+=` (${this.carrito[i].cantidad}) ${this.carrito[i].producto.modelo},`;
      }
        
    }
    this.descripcion = desc;
  }

  eliminarCarrito(idCarrito:number){
    this.carritoService.eliminarCarrito(idCarrito).subscribe(data=>{});
    document.getElementById(`carrito${idCarrito}`)?.remove();
    this.calcularTotal();
  }

  mostrar(event:any, i:number){
    
    let cant = parseInt(event.target.value);
    if(cant<=0 || cant>10 || isNaN(cant)){
      event.target.value = 1;
      return;
    }

    let produc= this.carrito[i];

    produc.cantidad = parseInt(event.target.value)
    this.carrito[i] = produc;
    this.calcularTotal();
    document.getElementById("subtotal-pagar")!.innerHTML="$"+this.total;
    document.getElementById("total-pagar")!.innerHTML="$"+this.total;
  }

  calcularTotalInd(carrito:any):number{
    let cantidad = parseInt(carrito.cantidad);
    let precio = parseInt(carrito.producto.precio);
    return cantidad*precio;
  }

  generarReferencia():string{
    const fecha = new Date();
    return Math.round((Math.random()*4754))+""+Math.round(fecha.getMilliseconds());
  }

  calcularTotal(){
    this.total = 0;
    let totalCompra = 0;
    let carritoCompra = this.carrito;
    for (let i = 0; i < carritoCompra.length; i++) {
        let producto = carritoCompra[i];
        totalCompra+=(producto.cantidad*producto.producto.precio);
    }
    this.total = totalCompra;
  }
}
