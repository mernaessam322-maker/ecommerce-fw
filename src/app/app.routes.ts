import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },

  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then(
        (m) => m.BrandsComponent
      ),
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then(
        (m) => m.CartComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'catogeries',
    loadComponent: () =>
      import('./features/catogeries/catogeries.component').then(
        (m) => m.CatogeriesComponent
      ),
  },

  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'details/:slug/:id',
    loadComponent: () =>
      import('./features/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/allorders/allorders.component').then(
        (m) => m.AllordersComponent
      ),
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/shop.component').then(
        (m) => m.ShopComponent
      ),
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'change-password',
    loadComponent: () =>
      import('./features/change-password/change-password.component').then(
        (m) => m.ChangePasswordComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'brands/:slug/:id',
    loadComponent: () =>
      import('./features/brand-details/brand-details.component').then(
        (m) => m.BrandDetailsComponent
      ),
  },

  {
    path: 'categories/:slug/:id',
    loadComponent: () =>
      import('./features/category-details/category-details.component').then(
        (m) => m.CategoryDetailsComponent
      ),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];