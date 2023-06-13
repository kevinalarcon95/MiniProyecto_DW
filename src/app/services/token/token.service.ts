import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private afAuth: AngularFireAuth) { }

  saveResponse(response: string){
    sessionStorage.setItem("userLogged", response);
  }

  getResponse(){
    return sessionStorage.getItem('userLogged');
  }

  saveToken(token: string) {
    sessionStorage.setItem("token",token);
  }

  saveEmail(email: string){
    sessionStorage.setItem("email", email);
  }

  getEmail(): string | null{
    return sessionStorage.getItem('email');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearToken() {
    sessionStorage.clear()
  }

  saveProductSelected(producto: string){
    return sessionStorage.setItem('productoSeleccionado',producto);
  }

  getProductSelected(){
    return sessionStorage.getItem('productoSeleccionado');
  }

  cleanProductSelect(){
    sessionStorage.setItem('productoSeleccionado', '');
  }
}
