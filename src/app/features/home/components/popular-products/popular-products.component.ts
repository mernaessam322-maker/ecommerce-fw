import { CartService } from './../../../../core/auth/services/cart/cart.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../core/auth/services/products/products.service';
import { Product } from '../../../../core/models/products-data.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../core/auth/services/wishlist/wishlist.service';

@Component({
  imports: [RouterLink],
  selector: 'app-popular-products',
  styleUrl: './popular-products.component.css',
  templateUrl: './popular-products.component.html',
})
export class PopularProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  productsList: WritableSignal<Product[]> = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        if (response.data) {
          this.productsList.set(response.data);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addToWishlist(productId: string):void{
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next:(res)=>{
        if(res.status === "success"){
          this.toastrService.success(res.message, 'Freshcart', {
            closeButton: true,
            timeOut: 2000,
          });
        }
      },
      error: (err) => {
        console.error('Wishlist error:', err);
        this.toastrService.error(err.error?.message || 'Failed to add to wishlist', 'Error', {
          closeButton: true,
          timeOut: 2000,
        });
      }
    })
  }
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Freshcart', {
            closeButton: true,
            timeOut: 2000,
          });
        }
      },
      error: (err) => {
        console.error('Cart error:', err);
        this.toastrService.error(err.error?.message || 'Failed to add to cart', 'Error', {
          closeButton: true,
          timeOut: 2000,
        });
      }
    });
  }
}
