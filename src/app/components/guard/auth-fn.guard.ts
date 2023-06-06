import { CanActivateFn, Router } from "@angular/router";
import { inject } from '@angular/core';
import { TokenService } from '../../services/token/token.service';

export const authGuardFn: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const routerService = inject (Router);

  const token = tokenService.getToken();
  if(!token){
    routerService.navigate(['/login']);
    return false;
  }
  return true;
}