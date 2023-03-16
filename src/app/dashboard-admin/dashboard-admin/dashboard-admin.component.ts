import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/services/compra.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
})
export class DashboardAdminComponent implements OnInit {
  usuario!:any;
  isLogged = false;
  isAdmin  =false;
  roles: string[] = [];
  cantidadClientes: any
  cantidadProductos: any
  cantidadVentas: any;
  constructor(
    private usuarioService: UsuarioService,
    private pser: ProductoService,
    private cser: CompraService,
    private token:TokenService
  ){}

  ngOnInit(): void {
  this.roles = this.token.getAuthorities();

  for (const rol in this.roles) {
    if(rol === "ADMIN"){
      this.isAdmin = true;
    }
  }
  if (this.token.getToken()) {
    this.isLogged = true;
    this.roles = this.token.getAuthorities();
  } 
  this.usuario = this.token.getUserName();
    this.usuarioService.contarClientesReg().subscribe(cantidad => {
      this.cantidadClientes = cantidad;
    })
    this.pser.contarProductos().subscribe(producto => {
      this.cantidadProductos = producto;
    })
    this.cser.valorVentas().subscribe(venta => {
      this.cantidadVentas = venta;
    })
  }
  esAdmin(){

  }
}
