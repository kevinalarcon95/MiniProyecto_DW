import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebaseError/firebase-code-error.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.recuperarUsuario = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {}

  recuperar(){
    const correoElectronico = this.recuperarUsuario.value.correoElectronico;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(correoElectronico).then(() => {
      this.toastr.info('Le enviamos un correo para restablecer la contraseña', 'Recuperar contraseña');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }
}
