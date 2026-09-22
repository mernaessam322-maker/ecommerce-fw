import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, DatePipe, DecimalPipe } from '@angular/common';
import { cartData } from '../../core/models/cart-data.interface';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {

  private readonly platformId = inject(PLATFORM_ID);

  orders: cartData[] = [];

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      const savedOrders = localStorage.getItem('orders');

      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      }

    }

  }
}