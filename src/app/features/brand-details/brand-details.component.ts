import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandsService } from '../../core/auth/services/brands/brands.service';
import { ProductsService } from '../../core/auth/services/products/products.service';
import { CartService } from '../../core/auth/services/cart/cart.service';
import { WishlistService } from '../../core/auth/services/wishlist/wishlist.service';
import { Product } from '../../core/models/products-data.interface';
import { ToastrService } from 'ngx-toastr';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css',
})
export class BrandDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly brandsService = inject(BrandsService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);

  brandId: WritableSignal<string> = signal('');
  brand: WritableSignal<Brand | null> = signal(null);
  products: WritableSignal<Product[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.getBrandId();
  }

  private getBrandId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.brandId.set(id);
        this.loadBrandDetails();
        this.loadBrandProducts();
      }
    });
  }

  private loadBrandDetails(): void {
    this.isLoading.set(true);
    this.brandsService.getSpecificBrand(this.brandId()).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.brand.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastr.error('Failed to load brand details');
        this.isLoading.set(false);
      },
    });
  }

  private loadBrandProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.products.set(res.data);
        }
      },
      error: (err) => {
        this.toastr.error('Failed to load products');
      },
    });
  }

  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastr.success('Product added to cart');
        }
      },
      error: () => {
        this.toastr.error('Failed to add product to cart');
      },
    });
  }

  addToWishlist(productId: string): void {
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastr.success('Product added to wishlist');
        }
      },
      error: () => {
        this.toastr.error('Failed to add product to wishlist');
      },
    });
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
