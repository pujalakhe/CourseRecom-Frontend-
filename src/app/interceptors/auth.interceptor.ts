import { HttpInterceptorFn } from '@angular/common/http';
import { JwtToken } from '../models/user';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return next(cloned);
  }
  return next(req);
};
//get the JWT_TOKEN
function getJwtToken(): string | null {
  let tokens: any = localStorage.getItem('JWT_TOKEN');
  if (!tokens) return null;
  const token = JSON.parse(tokens).access;
  return token;
}
