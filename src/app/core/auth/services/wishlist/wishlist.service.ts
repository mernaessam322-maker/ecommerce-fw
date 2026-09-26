import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { WishListDataResponse } from '../../../models/wish-list-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  addProductToWishlist(id: string): Observable<WishListDataResponse> {
    return this.httpClient.post<WishListDataResponse>(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }
  getLoggedUserWishlist(): Observable<WishListDataResponse> {
    return this.httpClient.get<WishListDataResponse>(`${environment.baseUrl}/api/v1/wishlist`);
  }
  removeProductFromWishlist(id: string): Observable<WishListDataResponse> {
    return this.httpClient.delete<WishListDataResponse>(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }
}
