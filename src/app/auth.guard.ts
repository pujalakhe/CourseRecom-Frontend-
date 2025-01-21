import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let toastService = inject(ToastrService);
  let router = inject(Router);
  if (!authService.isLoggedIn()) {
    toastService.error('You need to login first in order to access this page');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
