import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() {}

  /*
    Metodo que permite llamar los diferentes
    tipos de errores generados por firebase
  */
  codeError(code: string) {
    switch (code) {
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil, debe contener al menos seis caracteres';
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo invalido, debe ser una dirección de correo electronico valido';
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El correo no existe';
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta';
      default:
        return 'Error desconocido';
    }
  }
}
