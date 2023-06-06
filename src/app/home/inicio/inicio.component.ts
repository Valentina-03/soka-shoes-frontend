import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaComponent } from 'src/app/administracion/page/categoria/categoria.component';
import { CategoriaService } from 'src/app/services/categoria.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  imgs : any[] = [];
  categorias : any[] = [];
  constructor(private categoriaService : CategoriaService, private router : Router,private toastS: ToastrService) { }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias
      this.cargarImg();
    } )
    
  }
  public cargarImg(){
    for(let i = 0; i<this.categorias.length; i++)
      this.categoriaService.getImgProduct(this.categorias[i].idCategoria).subscribe(img =>{
        this.imgs[i] = URL.createObjectURL(img);
        console.log(img);
        
      } );
      
  }
}
