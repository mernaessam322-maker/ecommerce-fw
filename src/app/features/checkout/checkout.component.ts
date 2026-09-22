import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { PaymentService } from '../../core/auth/services/payment/payment.service';
import { CartService } from '../../core/auth/services/cart/cart.service';
import { cartData } from '../../core/models/cart-data.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly paymentService = inject(PaymentService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  cartId: WritableSignal<string> = signal<string>('');

  cartDetailsData: WritableSignal<cartData> = signal({} as cartData);

  paymentMethod = signal<'cash' | 'online'>('cash');

  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.getCartId();
    this.getCartDetails();
    this.initCheckoutForm();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.cartId.set(params.get('id')!);
    });
  }

 getCartDetails(): void {
  this.cartService.getLoggedUserCart().subscribe({
    next: (res) => {

      this.cartDetailsData.set(res.data);

      this.cartId.set(res.data._id);

    },
  });
}

  selectPaymentMethod(method: 'cash' | 'online'): void {
    this.paymentMethod.set(method);
  }

  initCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        city: ['', Validators.required],
        details: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^01[0125][0-9]{8}$/),
          ],
        ],
      }),
    });
  }

 submitForm(): void {

  if (this.checkoutForm.valid) {

    if (this.paymentMethod() === 'cash') {

      this.paymentService
        .createCashOrder(this.cartId(), this.checkoutForm.value)
        .subscribe({

          next: (res) => {

            if (res.status === 'success') {

              if (isPlatformBrowser(this.platformId)) {

                const oldOrders: cartData[] = JSON.parse(
                  localStorage.getItem('orders') || '[]'
                );

                oldOrders.push(this.cartDetailsData());

                localStorage.setItem(
                  'orders',
                  JSON.stringify(oldOrders)
                );

              }

              this.router.navigate(['/allorders']);
            }

          }

        });

    }

    else if (this.paymentMethod() === 'online') {

      this.paymentService
        .checkoutSession(this.cartId(), this.checkoutForm.value)
        .subscribe({

          next: (res) => {

            if (res.status === 'success') {

              open(res.session.url, '_self');

            }

          }

        });

    }

  }

}
}