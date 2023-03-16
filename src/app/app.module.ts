import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PayuComponent } from './payu/payu/payu.component';
import { HeaderComponent } from './home/header/header/header.component';
import { FooterComponent } from './home/footer/footer/footer.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { CarritoComponent } from './carrito/carrito/carrito.component';
import { InicioComponent } from './home/inicio/inicio/inicio.component';
import { TallaService } from './services/talla.service';
import { ColorService } from './services/color.service';
import {MarcaService} from './services/marca.service';
import { AuthLoginComponent } from './security/auth/auth-login/auth-login.component';
import { AuthRegistroComponent } from './security/auth/auth-register/auth-registro.component';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { TransaccionService } from './services/transaccion.service';
import { PaqInterceptorService } from './security/interceptors/paq-interceptor.service';

import { interceptorProvider } from './security/interceptors/paq-interceptor.service';
import { DashboardComponent } from './home/dashboard/dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin/dashboard-admin.component';
import { XdComponent } from './prueba/xd/xd.component';
import { FormProductComponent } from './home/forms/form-product/form-product/form-product.component';
import { HeaderAdminComponent } from './home/header-admin/header-admin.component';
import { MenuAdminComponent } from './home/menu-admin/menu-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableProductComponent } from './home/forms/table-product/table-product/table-product.component';
import { EditProductosComponent } from './home/forms/form-product/edit-productos/edit-productos.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactoComponent } from './home/contacto/contacto.component';
import { InformacionPagoComponent } from './informacion-pago/informacion-pago.component';
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
    EditProductosComponent,
    ContactoComponent,
    InformacionPagoComponent,
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
    TallaService, 
    ColorService,
    UsuarioService,
    TransaccionService,
    PaqInterceptorService,
    interceptorProvider,
    MarcaService,
    
    ],
  bootstrap: [AppComponent]

})
export class AppModule { }
