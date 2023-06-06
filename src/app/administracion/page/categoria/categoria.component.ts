import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias : any[] = [];
  
  constructor(private categoriaService : CategoriaService, private router : Router,private toastS: ToastrService) { 
  
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias)
  }

  editar(id:any){
    this.router.navigateByUrl("/editarProducto/"+id);
  }
  agregar(){
    this.router.navigateByUrl("/formCategoria");
  }
  eliminar(id:any){

  }
}
