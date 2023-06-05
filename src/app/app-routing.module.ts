import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { DashboardAdminComponent } from './administracion/dashboard-admin/dashboard-admin.component';
import { ContactoComponent } from './home/contacto/contacto.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { FormProductComponent } from './home/productos/form-product/form-productos.component';
import { TableProductComponent } from './home/productos/table-product/table-product.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { PayuComponent } from './payu/payu.component';
import { ProductosComponent } from './home/productos/productos.component';
import { AuthLoginComponent } from './security/auth/auth-login/auth-login.component';
import { AuthRegistroComponent } from './security/auth/auth-register/auth-registro.component';

const routes: Routes = [
  {path: 'pagos',component: PayuComponent},
  {path: 'productos',component: ProductosComponent},
  {path: 'carrito',component: CarritoComponent},
  {path: 'inicio',component: InicioComponent},
  {path: 'login',component: AuthLoginComponent},
  {path: 'registro',component: AuthRegistroComponent},
  {path: 'miCuenta',component: DashboardComponent},
  {path: 'admin',component: DashboardAdminComponent},
  {path: 'contacto',component: ContactoComponent},

  {path: '',component: InicioComponent},
  {path: 'listaproductos',component: TableProductComponent},
  {path: 'agregarProducto',component: FormProductComponent},
  {path: 'editarProducto/:idProducto',component: FormProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
