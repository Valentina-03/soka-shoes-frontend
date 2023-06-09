import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarcaService } from 'src/app/services/marca.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  marcas:any = [];

  constructor(
    private mser: MarcaService,
    private toastr: ToastrService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.mser.getMarcas().subscribe(marcas => {
      this.marcas = marcas
    })
  }

  agregar(){
    this.router.navigateByUrl("/agregarMarca");
  }

  editar(id:any){
    this.router.navigateByUrl("/editarMarca/"+id);
  }

  eliminar(id:any){
    this.router.navigateByUrl("/eliminarMarca"+id);
  }

}
