import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatogeriesService } from '../../core/auth/services/catogeries/catogeries.service';
import { ProductsService } from '../../core/auth/services/products/products.service';
import { CartService } from '../../core/auth/services/cart/cart.service';
import { WishlistService } from '../../core/auth/services/wishlist/wishlist.service';
import { Product } from '../../core/models/products-data.interface';
import { ToastrService } from 'ngx-toastr';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService = inject(CatogeriesService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);

  categoryId: WritableSignal<string> = signal('');
  category: WritableSignal<Category | null> = signal(null);
  products: WritableSignal<Product[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.getCategoryId();
  }

  private getCategoryId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.categoryId.set(id);
        this.loadCategoryDetails();
        this.loadCategoryProducts();
      }
    });
  }

  private loadCategoryDetails(): void {
    this.isLoading.set(true);
    this.categoriesService.getSpecficCatogery(this.categoryId()).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.category.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastr.error('Failed to load category details');
        this.isLoading.set(false);
      },
    });
  }

  private loadCategoryProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        if (res.data) {
          const filtered = res.data.filter((product: Product) =>
            product.category?._id === this.categoryId()
          );
          this.products.set(filtered);
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
