/*
  Clase abstracta con los tipos de errores que puede
  arrojar firebase a la hora de autenticar el registro o el login
 */
export enum FirebaseCodeErrorEnum {
  EmailAlreadyInUse = 'auth/email-already-in-use',
  WeakPassword = 'auth/weak-password',
  InvalidEmail = 'auth/invalid-email',
  UserNotFound = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password',
}
