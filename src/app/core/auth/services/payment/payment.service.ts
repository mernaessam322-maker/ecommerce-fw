import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CashPaymentResponse } from '../../../models/cash-payment.interface';
import { OnlinePaymentResponse } from '../../../models/online-payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly httpClient = inject(HttpClient);

  createCashOrder(cartId: string, data: object): Observable<CashPaymentResponse> {
    return this.httpClient.post<CashPaymentResponse>(`${environment.baseUrl}/api/v1/orders/${cartId}`, data);
  }
  checkoutSession(cartId: string, data: Object): Observable<OnlinePaymentResponse> {
    return this.httpClient.post<OnlinePaymentResponse>(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      data,
    );
  }
}
