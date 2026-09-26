import { Product } from './../../core/models/products-data.interface';
import { platform } from 'os';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/auth/services/cart/cart.service';
import { cartData } from '../../core/models/cart-data.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly platform = inject(PLATFORM_ID);

  cartDetailsData: WritableSignal<cartData> = signal({} as cartData);

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');

      if (token) {
        this.cartService.getLoggedUserCart().subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.cartDetailsData.set(res.data);
            }
          },
          error: (err) => {
            console.error('Cart error:', err);
          }
        });
      }
    }
  }
  removeItem(productId: string): void {
    this.cartService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
        }
      },
    });
  }
  updateItem(productId:string,count:number):void{
    this.cartService.updateCartProductQuantity(productId,count).subscribe({
      next:(res)=>{
        this.cartDetailsData.set(res.data)
      }
    })
  }
  clearAll():void{
    this.cartService.clearUserCart().subscribe({
      next:(res)=>{
        if(res.status==="success"){
         this.cartDetailsData.set(res.data)
        }
      }
    })
  }
}
