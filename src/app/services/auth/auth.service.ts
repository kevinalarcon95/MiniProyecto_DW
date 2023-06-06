import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
  
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {  
    afAuth.authState.subscribe(user=>{
      console.log(user);
    })
  }

  async login(email: string, password: string) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  }

  register(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email,password);
  }

  verifyEmail(){
    const verified = this.afAuth.currentUser.then(user =>{
      if(user){
        user.sendEmailVerification();
      }
    });
    return true;
  }

  logout() {
    return this.afAuth.signOut();
  }
}
