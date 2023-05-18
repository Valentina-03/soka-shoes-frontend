import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
})
export class TableProductComponent implements OnInit {
  productos:any [] = [];

  constructor(
    private productoService:ProductoService,
    private router: Router,
    private toastS: ToastrService
    ) { }

  ngOnInit(): void {
    this.productoService.getAllProductos().subscribe(productos=> this.productos = productos);
  }

  estado(id:any, e:any){
    if(e == 0){
    this.productoService.deshabilitar(id).subscribe(async producto => {
      this.toastS.success('¡Producto deshabilitado!', '', {
        timeOut: 2000, positionClass: 'toast-top-center'
      })
      await new Promise(f => setTimeout(f, 1500));
      window.location.reload();
      })
    }else{
      this.productoService.habilitar(id).subscribe(async producto => {
        this.toastS.success('¡Producto habilitado!', '', {
          timeOut: 2000, positionClass: 'toast-top-center'
        })
        await new Promise(f => setTimeout(f, 1500));
        window.location.reload();
        })
    }
  }

  activar(id:any){
    this.productoService.habilitar(id).subscribe(async producto => {
      this.toastS.success('¡Producto habilitado!', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
      await new Promise(f => setTimeout(f, 1500));
      window.location.reload();
     })
   }
   editar(id:any){
    this.router.navigateByUrl("/editarProducto/"+id);
  }

  agregar(){
    this.router.navigateByUrl("/agregarProducto");
  }
}
