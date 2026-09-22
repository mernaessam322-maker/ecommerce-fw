import { platform } from 'os';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/auth/services/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { WishListData } from '../../core/models/wish-list-data.interface';
@Component({
  imports: [],
  selector: 'app-wishlist',
  styleUrl: './wishlist.component.css',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly platform = inject(PLATFORM_ID);
  wishListDetailsData: WritableSignal<WishListData[]> = signal([]);
  ngOnInit(): void {
    this.getWishlistData();
  }
  getWishlistData(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        this.wishlistService.getLoggedUserWishlist().subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.wishListDetailsData.set(res.data);
            }
          },
        });
      }
    }
  }
 removeItemFromWishlist(productId: string): void {

  this.wishlistService.removeProductFromWishlist(productId).subscribe({
    next: (res) => {

      if (res.status === 'success') {
        this.getWishlistData();
      }
    },

  
  });
}
}
