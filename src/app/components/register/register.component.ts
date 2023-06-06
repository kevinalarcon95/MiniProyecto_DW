import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebaseError/firebase-code-error.service';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.registrarUsuario = this.fb.group({
      correoElectronico: [null, [Validators.required, Validators.email]],
      contrasena: [null, [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  register() {
    const correoElectronico = this.registrarUsuario.value.correoElectronico;
    const contrasena = this.registrarUsuario.value.contrasena;
    const confirmarContrasena = this.registrarUsuario.value.confirmarContrasena;

    if (contrasena !== confirmarContrasena) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }
    this.loading = true;
    this.auth
      .register(correoElectronico, contrasena)
      .then((user) => {
        //this.verificarCorreo();
        this.verifyEmail();
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }

  verifyEmail() {
    if (this.auth.verifyEmail()) {
      this.toastr.info('Le enviamos un correo electronico para su verificación!','Verificar correo');
      this.router.navigate(['/login']);
    }
  }

}
