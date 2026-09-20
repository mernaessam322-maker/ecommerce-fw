import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/auth/services/products/products.service';
import { ProductDetails } from '../../core/models/product-details.interface';
import { DatePipe } from '@angular/common';


@Component({
  imports: [DatePipe],
  selector: 'app-details',
  styleUrl: './details.component.css',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
    private readonly productsService = inject(ProductsService);


  productId:WritableSignal<string> = signal<string>('');
    productIdData:WritableSignal<ProductDetails> = signal<ProductDetails>({} as ProductDetails);



  ngOnInit(): void {
    this.getProductId();
  }

 getProductId(): void {
  this.activatedRoute.paramMap.subscribe((params) => {
    this.productId.set(params.get('id')!);
this.getSpecificProductId();

  });
}

getSpecificProductId(): void {
 this.productsService.getSpecificProduct(this.productId()).subscribe({
  next: (response) => {
    if (response.data) {
      this.productIdData.set(response.data);
    }
  },
  error: (error) => {
    console.log(error);
  },
  });
 }
}
