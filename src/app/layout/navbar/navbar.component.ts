import { Component, computed, inject, OnInit, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../../core/auth/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly platform = inject(PLATFORM_ID);

  logged: Signal<boolean> = computed(() => this.authService.isLogged());
  cartCount: WritableSignal<number> = signal(0);

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.checkToken();
    this.loadCartCount();
  }

  checkToken(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');

      if (token) {
        this.authService.isLogged.set(true);
        this.loadCartCount();
      }
    }
  }

  loadCartCount(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');

      if (token) {
        this.cartService.getLoggedUserCart().subscribe({
          next: (res: any) => {
            if (res.numOfCartItems) {
              this.cartCount.set(res.numOfCartItems);
            } else if (res.data && res.data.products) {
              this.cartCount.set(res.data.products.length);
            } else {
              this.cartCount.set(0);
            }
          },
          error: (err) => {
            console.error('Failed to load cart count:', err);
            this.cartCount.set(0);
          }
        });
      } else {
        this.cartCount.set(0);
      }
    }
  }
}
