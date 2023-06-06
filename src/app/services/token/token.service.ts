import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private afAuth: AngularFireAuth) { }

  saveToken(token: string) {
    // your token
  }

  getToken():boolean {
    return true;
  }

  clearToken() {
    // your token
  }
}
