import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { PopularCatogereisComponent } from './components/popular-catogereis/popular-catogereis.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';

@Component({
  imports: [SliderComponent, PopularCatogereisComponent, PopularProductsComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
