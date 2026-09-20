import { platform } from 'os';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platform = inject(PLATFORM_ID)
  const token = localStorage.getItem('freshToken');

 if(isPlatformBrowser(platform)){
 if (token) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
 }else{
  return true
 }
};
