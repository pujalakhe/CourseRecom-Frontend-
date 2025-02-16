import { HttpInterceptorFn } from '@angular/common/http';

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
  try {
    const authData = localStorage.getItem('AUTH_DATA');
    if (!authData) return null;

    const parsedData = JSON.parse(authData);
    return parsedData.tokens.access;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}
