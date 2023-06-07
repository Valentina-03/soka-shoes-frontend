import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {
  compras:any [] = [];

  constructor(
    private compraService:CompraService,
    private router: Router,
    private toastS: ToastrService,

  ) { }

  ngOnInit(): void {
    this.compraService.getCompras().subscribe(usuarios=> this.compras = usuarios);

  }

}
