import { Component, inject, OnInit, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/auth/services/products/products.service';
import { CartService } from '../../core/auth/services/cart/cart.service';
import { WishlistService } from '../../core/auth/services/wishlist/wishlist.service';
import { ProductDetails } from '../../core/models/product-details.interface';
import { DatePipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [DatePipe, CommonModule],
  selector: 'app-details',
  styleUrl: './details.component.css',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);

  productId: WritableSignal<string> = signal<string>('');
  productIdData: WritableSignal<ProductDetails> = signal<ProductDetails>({} as ProductDetails);
  quantity: WritableSignal<number> = signal(1);

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId.set(params.get('id')!);
      this.getSpecificProductId();
    });
  }

  getSpecificProductId(): void {
    this.productsService.getSpecificProduct(this.productId()).subscribe({
      next: (response) => {
        if (response.data) {
          this.productIdData.set(response.data);
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Failed to load product details');
      },
    });
  }

  addToCart(): void {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('freshToken') : null;

    if (!token) {
      this.toastr.error('Please login first');
      return;
    }

    this.cartService.addProductToCart(this.productId()).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastr.success('Product added to cart successfully');
        }
      },
      error: (err) => {
        console.error('Add to cart error:', err);
        this.toastr.error(err.error?.message || 'Failed to add product to cart');
      },
    });
  }

  addToWishlist(): void {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('freshToken') : null;

    if (!token) {
      this.toastr.error('Please login first');
      return;
    }

    this.wishlistService.addProductToWishlist(this.productId()).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastr.success('Product added to wishlist successfully');
        }
      },
      error: (err) => {
        console.error('Add to wishlist error:', err);
        this.toastr.error(err.error?.message || 'Failed to add product to wishlist');
      },
    });
  }

  increaseQuantity(): void {
    this.quantity.set(this.quantity() + 1);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }
}
