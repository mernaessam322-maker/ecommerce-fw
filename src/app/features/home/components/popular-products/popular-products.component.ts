import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../core/auth/services/products/products.service';
import { Product } from '../../../../core/models/products-data.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-popular-products',
  styleUrl: './popular-products.component.css',
  templateUrl: './popular-products.component.html',
})
export class PopularProductsComponent implements OnInit {
  private readonly productsService = inject (ProductsService);

  productsList:WritableSignal<Product[]> = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        if (response.data) {
          this.productsList.set(response.data);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
