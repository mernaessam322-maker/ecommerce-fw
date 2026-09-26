import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { CartDataResonse } from '../../../models/cart-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  addProductToCart(id: string): Observable<CartDataResonse> {
    return this.httpClient.post<CartDataResonse>(`${environment.baseUrl}/api/v2/cart`, {
      productId: id,
    });
  }
  getLoggedUserCart(): Observable<CartDataResonse> {
    return this.httpClient.get<CartDataResonse>(`${environment.baseUrl}/api/v2/cart`);
  }
  removeProductFromCart(id: string): Observable<CartDataResonse> {
    return this.httpClient.delete<CartDataResonse>(`${environment.baseUrl}/api/v2/cart/${id}`);
  }
  updateCartProductQuantity(id: string, productCount: number): Observable<CartDataResonse> {
    return this.httpClient.put<CartDataResonse>(`${environment.baseUrl}/api/v2/cart/${id}`, {
      count: productCount,
    });
  }
  clearUserCart(): Observable<CartDataResonse> {
    return this.httpClient.delete<CartDataResonse>(`${environment.baseUrl}/api/v2/cart`);
  }
}
