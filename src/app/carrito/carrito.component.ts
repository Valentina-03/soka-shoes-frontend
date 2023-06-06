import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/services/compra.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit
{
  carritos:any = [];
  totales: any = [];
  total:number = 0;
  email = "";
  usuario:any;

  constructor(
    private usuarioService:UsuarioService,
    private compraService: CompraService,
    private token:TokenService,
    private toastS:ToastrService

    ) { }

  ngOnInit(): void {
    this.email= this.token.getEmail();
    this.usuarioService.usuarioPorEmail(this.email).subscribe(usuarioEncontrado=>{
      this.usuario = usuarioEncontrado;
      this.usuarioService.carritoDeUsuario(this.usuario.idUsuario).subscribe(carritos=>{
        this.carritos = carritos;
        for(let i = 0; i<this.carritos.length; i++)
          this.total += (this.carritos[i].detalleProducto.producto.precio * this.carritos[i].cantidad)
      })
    })
  }

  actualizarCarrito(){
    this.total = 0;
    for(let i=0; i<this.carritos.length; i++){
      let cnt = Number($("#cnt-"+i).val())
      this.carritos[i].cantidad = cnt;
      this.total += (this.carritos[i].cantidad * this.carritos[i].detalleProducto.producto.precio)
    }
    this.usuarioService.editarCarritos(this.usuario.idUsuario, this.carritos).subscribe(data =>{
      this.toastS.success('¡Carrito Actualizado!', '', {
        timeOut: 1000, positionClass: 'toast-top-center'
      })
    })
  }

  eliminarCarrito(id:number){
    this.usuarioService.eliminarCarrito(this.usuario.idUsuario, this.carritos[id].idCarrito).subscribe()
    this.carritos.splice(id, 1)
  }
}
