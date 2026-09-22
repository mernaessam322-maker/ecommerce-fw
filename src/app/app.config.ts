import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';

import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),

    provideClientHydration(),
        provideToastr(),

    provideHttpClient(withInterceptors([errorsInterceptor, headersInterceptor])),
  ],
};
