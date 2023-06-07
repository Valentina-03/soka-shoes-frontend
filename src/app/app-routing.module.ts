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
import { MisComprasComponent } from './home/mis-compras/mis-compras.component';
import { EditarInfoComponent } from './administracion/page/editar-info/editar-info.component';
import { EmpleadoComponent } from './administracion/page/empleado/empleado.component';
import { AddEmpleadoComponent } from './administracion/page/empleado/add-empleado/add-empleado.component';
import { CategoriaComponent } from './administracion/page/categoria/categoria.component';
import { FormCategoriaComponent } from './administracion/page/categoria/form-categoria/form-categoria.component';
import { MarcasComponent } from './home/marcas/marcas.component';
import { FormMarcasComponent } from './home/marcas/form-marcas/form-marcas.component';

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
  
  //Componentes CR
  {path: 'miscompras',component: MisComprasComponent},
  {path: 'editarinfo',component: EditarInfoComponent},
  {path: 'empleados',component: EmpleadoComponent},
  {path: 'nuevoempleado',component: AddEmpleadoComponent},
  {path: 'editarEmpleado/:idUsuario', component:AddEmpleadoComponent},
       

  //Componentes Ber
  {path: 'categorias', component: CategoriaComponent},
  {path: 'formCategoria', component: FormCategoriaComponent},
  
  //Componentes Dani la linda
  {path: 'marcas',component: MarcasComponent},
  {path: 'editarMarca/:idMarca',component: FormMarcasComponent},
  {path: 'agregarMarca',component: FormMarcasComponent},


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
