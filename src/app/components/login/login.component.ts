import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService){
      this.loginUsuario = this.fb.group({
        correoElectronico: ['', Validators.required],
        contrasena: ['', Validators.required]
      });
    }

  ngOnInit(): void {}

  login(){
    const correoElectronico = this.loginUsuario.value.correoElectronico;
    const contrasena = this.loginUsuario.value.contrasena;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(correoElectronico, contrasena).then((user) => {
      console.log(user);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      this.loading = false;
      console.log(error);
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }
}
