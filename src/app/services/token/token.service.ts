import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private afAuth: AngularFireAuth) { }

  saveResponse(response: string){
    sessionStorage.setItem("userLogged", response);
  }

  saveToken(token: string) {
    sessionStorage.setItem("token",token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearToken() {
    sessionStorage.clear()
  }
}
