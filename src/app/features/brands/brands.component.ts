import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandsService } from '../../core/auth/services/brands/brands.service';
import { ToastrService } from 'ngx-toastr';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-brands',
  styleUrl: './brands.component.css',
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  private readonly toastr = inject(ToastrService);

  brands: WritableSignal<Brand[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.isLoading.set(true);
    this.brandsService.getAllBrands().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.brands.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastr.error('Failed to load brands');
        this.isLoading.set(false);
      },
    });
  }
}
