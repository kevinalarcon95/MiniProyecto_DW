import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.registrarUsuario = this.fb.group({
      correoElectronico: ['', Validators.required, Validators.email],
      contrasena: ['', Validators.required, Validators.minLength(6)],
      confirmarContrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  registrar() {
    const correoElectronico = this.registrarUsuario.value.correoElectronico;
    const contrasena = this.registrarUsuario.value.contrasena;
    const confirmarContrasena = this.registrarUsuario.value.confirmarContrasena;

    if (contrasena !== confirmarContrasena) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }
    this.loading = true;
    this.afAuth
      .createUserWithEmailAndPassword(correoElectronico, contrasena)
      .then((user) => {
        this.verificarCorreo();
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }
  verificarCorreo() {
    this.afAuth.currentUser.then(user => user?.sendEmailVerification()).then(() => {
      this.toastr.info('Le enviamos un correo electronico para su verificación!', 'Verificar correo');
      this.router.navigate(['/login']);
    });
  }
}
