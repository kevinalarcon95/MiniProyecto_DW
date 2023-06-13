import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyMailComponent } from './components/verify-mail/verify-mail.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ContainerPrincipalComponent } from './components/container-principal/container-principal.component';
import { authGuardFn } from './components/guard/auth-fn.guard';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: '', redirectTo : 'login', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifyMail', component: VerifyMailComponent },
  { path: 'recoverPassword', component: RecoverPasswordComponent },
  { path: 'containerPrincipal', canActivate: [authGuardFn] ,component: ContainerPrincipalComponent },
  { path: 'listaProductos', canActivate: [authGuardFn] ,component: ProductComponent },
  { path: '**', redirectTo : 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
