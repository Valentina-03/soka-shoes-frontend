//Security
import { AuthLoginComponent } from './security/auth/auth-login/auth-login.component';
import { AuthRegistroComponent } from './security/auth/auth-register/auth-registro.component';
import { interceptorProvider } from './security/interceptors/paq-interceptor.service';

//Pagos
import { InformacionPagoComponent } from './informacion-pago/informacion-pago.component';
import { PayuComponent } from './payu/payu.component';

//Usuario
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { ContactoComponent } from './home/contacto/contacto.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { ProductosComponent } from './home/productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { MisComprasComponent } from './home/mis-compras/mis-compras.component';

//Admin
import { HeaderAdminComponent } from './home/header-admin/header-admin.component';
import { MenuAdminComponent } from './home/menu-admin/menu-admin.component';
import { DashboardAdminComponent } from './administracion/dashboard-admin/dashboard-admin.component';
import { FormProductComponent } from './home/productos/form-product/form-productos.component';
import { TableProductComponent } from './home/productos/table-product/table-product.component';
import { EditarInfoComponent } from './administracion/page/editar-info/editar-info.component';
import { EmpleadoComponent } from './administracion/page/empleado/empleado.component';
import { AddEmpleadoComponent } from './administracion/page/empleado/add-empleado/add-empleado.component';


import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    PayuComponent,
    HeaderComponent,
    FooterComponent,
    ProductosComponent,
    CarritoComponent,
    InicioComponent,
    AuthLoginComponent,
    AuthRegistroComponent,
    DashboardComponent,
    DashboardAdminComponent,
    FormProductComponent,
    HeaderAdminComponent,
    MenuAdminComponent,
    TableProductComponent,
    ContactoComponent,
    InformacionPagoComponent,
    EditarInfoComponent,
    EmpleadoComponent,
    AddEmpleadoComponent,
    MisComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [
    interceptorProvider,

    ],
  bootstrap: [AppComponent]

})
export class AppModule { }
