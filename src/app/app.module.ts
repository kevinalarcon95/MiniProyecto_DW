import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//Componentes
import { AppComponent } from './app.component';
import { ContainerPrincipalComponent } from './components/container-principal/container-principal.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { VerifyMailComponent } from './components/verify-mail/verify-mail.component';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { DataServices } from './data.services';
import { ProviderComponent } from './components/provider/provider.component';
import { CreateProviderComponent } from './components/provider/create-provider/create-provider.component';
import { ListProviderComponent } from './components/provider/list-provider/list-provider.component';



@NgModule({
  declarations: [
    AppComponent,
    ContainerPrincipalComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    VerifyMailComponent,
    SpinnerComponent,
    SidebarComponent,
    NavbarComponent,
    ProductComponent,
    CreateProductComponent,
    ListProductComponent,
    ProviderComponent,
    CreateProviderComponent,
    ListProviderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [DataServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
