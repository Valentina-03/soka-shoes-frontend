import { ProductoService } from 'src/app/services/producto.service';
import { DetalleProductoService } from './services/detalle_producto.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PayuComponent } from './payu/payu.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { CarritoComponent } from './carrito/carrito.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { TallaService } from './services/talla.service';
import { ColorService } from './services/color.service';
import {MarcaService} from './services/marca.service';
import {CategoriaService} from './services/categoria.service';
import { AuthLoginComponent } from './security/auth/auth-login/auth-login.component';
import { AuthRegistroComponent } from './security/auth/auth-register/auth-registro.component';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { TransaccionService } from './services/transaccion.service';
import { PaqInterceptorService } from './security/interceptors/paq-interceptor.service';
import { ProductosComponent } from './home/productos/productos.component';
import { interceptorProvider } from './security/interceptors/paq-interceptor.service';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { DashboardAdminComponent } from './administracion/dashboard-admin/dashboard-admin.component';
import { XdComponent } from './prueba/xd/xd.component';
import { FormProductComponent } from './home/productos/form-product/form-productos.component';
import { HeaderAdminComponent } from './home/header-admin/header-admin.component';
import { MenuAdminComponent } from './home/menu-admin/menu-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableProductComponent } from './home/productos/table-product/table-product.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactoComponent } from './home/contacto/contacto.component';
import { InformacionPagoComponent } from './informacion-pago/informacion-pago.component';
import { EditarInfoComponent } from './administracion/page/editar-info/editar-info.component';
import { EmpleadoComponent } from './administracion/page/empleado/empleado.component';
import { AddEmpleadoComponent } from './administracion/page/empleado/add-empleado/add-empleado.component';
import { MisComprasComponent } from './home/mis-compras/mis-compras.component';
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
    XdComponent,
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
    BrowserAnimationsModule
  ],
  providers: [
    MarcaService,
    CategoriaService,
    DetalleProductoService,
    ProductoService,
    TallaService,
    ColorService,
    UsuarioService,
    TransaccionService,

    PaqInterceptorService,
    interceptorProvider,

    ],
  bootstrap: [AppComponent]

})
export class AppModule { }
