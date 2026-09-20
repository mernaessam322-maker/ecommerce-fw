import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CatogeriesService } from '../../../../core/auth/services/catogeries/catogeries.service';
import { Category, ProductDetails } from '../../../../core/models/product-details.interface';

@Component({
  imports: [],
  selector: 'app-popular-catogereis',
  styleUrl: './popular-catogereis.component.css',
  templateUrl: './popular-catogereis.component.html',
})
export class PopularCatogereisComponent implements OnInit {
  private readonly catogeriesService = inject(CatogeriesService);
categoriesList: WritableSignal<Category[]> = signal<Category[]>([]);

  ngOnInit(): void {
    this.getCatogeries();
  }

  getCatogeries() {
   this.catogeriesService.getAllCatogeries().subscribe({
    next: (response) => {
      this.categoriesList.set(response.data);
    },
    error: (error) => {
      console.log(error);
    }
   });  
  }
}
