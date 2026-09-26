import { Component, OnInit, PLATFORM_ID, inject, signal, WritableSignal, computed } from '@angular/core';
import { isPlatformBrowser, DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { OrdersService } from '../../core/auth/services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, DecimalPipe, CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ordersService = inject(OrdersService);
  private readonly toastr = inject(ToastrService);

  private ordersSignal: WritableSignal<any[]> = signal([]);
  orders = computed(() => this.ordersSignal());
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadOrders();
    }
  }

  private loadOrders(): void {
    this.isLoading.set(true);
    this.ordersService.getUserOrders().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.ordersSignal.set(Array.isArray(res.data) ? res.data : [res.data]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastr.error('Failed to load orders');
        this.isLoading.set(false);
      },
    });
  }
}