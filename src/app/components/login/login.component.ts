import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseCodeErrorService } from 'src/app/services/firebaseError/firebase-code-error.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private token: TokenService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.loginUsuario = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
      const correoElectronico = this.loginUsuario.value.correoElectronico;
      const contrasena = this.loginUsuario.value.contrasena;
      this.loading = true;  
      this.auth.login(correoElectronico,contrasena).then((user) =>{
        if (user?.emailVerified) {
          this.token.saveResponse(JSON.stringify(user));
          user.getIdToken().then(data =>{
            this.token.saveToken(JSON.stringify(data)); 
            this.router.navigate(['/containerPrincipal']);          
          })
        } else {
          this.router.navigate(['/verifyMail']);
        }
      }) .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  
  }
}
