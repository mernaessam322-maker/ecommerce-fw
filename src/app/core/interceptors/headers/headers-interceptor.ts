import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  const platform = inject(PLATFORM_ID);

  if (isPlatformBrowser(platform)) {

    const token = localStorage.getItem('freshToken');

    if (token) {

      req = req.clone({
        setHeaders: {
          token: token,
        },
      });

    }

  }

  return next(req);
};