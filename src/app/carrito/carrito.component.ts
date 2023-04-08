import { Usuario } from './../models/Usuario';
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

  carritos:any = [];
  totales: any = [];
  total!:number;
  uri = global.url_front;
  descripcion= "";

  // Variables Payu ==============================================
  referenciaUnic = 0;
  iva = 0.19;
  moneda = "COP";
  apikey = "yn1jslEAEe809I0BVfHp0VOUIW";

  idMercado = "953228";
  idCuenta = "960860";

  //email = "genesisd@gmial.com"
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

  email = "";
  usuario:Usuario;

  constructor(
    private usuarioService:UsuarioService,
    private compraService: CompraService,
    private carritoService: CarritoService,
    private token:TokenService,
    private toastS:ToastrService

    ) { }

  ngOnInit(): void {
    this.email= this.token.getEmail();
    console.log(this.email);
    this.usuarioService.usuarioPorEmail(this.email).subscribe(usuarioEncontrado=>{
      console.log(usuarioEncontrado);
      this.usuario = usuarioEncontrado;
      this.cargarCarrito();
    });
  }

  cargarCarrito(){
    console.log(this.usuario);
    this.usuarioService.carritoDeUsuario(this.usuario.idUsuario).subscribe(carritos=>{
      this.carritos = carritos;
      this.getTotales();
      this.actializarFirma();
    })
  }

  getTotales(){
    for(let i = 0; i<this.carritos.length; i++)
    this.totales[i] = this.carritos[i].detalleProducto.producto.precio * this.carritos[i].cantidad;
  }

   cargarDatos(form:any){

    var compra= {
      "idCompra":this.referenciaUnic,
      "totalCompra":this.total,
      "estado":"PENDIENTE"
    }
    this.carritoService.guardarCarritos(this.carritos).subscribe(data=>{
    })

    this.compraService.guardarCompra(compra,this.usuario.idUsuario).subscribe(async data=>{
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

  }

  eliminarCarrito(idCarrito:number){

  }

  mostrar(event:any, i:number){


  }

  calcularTotal(i:number){
    this.carritos[i].precio * this.carritos[i].cantidad;
  }
}
