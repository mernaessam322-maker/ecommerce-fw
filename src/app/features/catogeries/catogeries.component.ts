import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatogeriesService } from '../../core/auth/services/catogeries/catogeries.service';
import { ToastrService } from 'ngx-toastr';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-catogeries',
  styleUrl: './catogeries.component.css',
  templateUrl: './catogeries.component.html',
})
export class CatogeriesComponent implements OnInit {
  private readonly categoriesService = inject(CatogeriesService);
  private readonly toastr = inject(ToastrService);

  categories: WritableSignal<Category[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading.set(true);
    this.categoriesService.getAllCatogeries().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.categories.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastr.error('Failed to load categories');
        this.isLoading.set(false);
      },
    });
  }
}
