import { Component } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { BannerComponent } from "../banner/banner.component";
import { ProductListComponent } from "../product-list/product-list.component";

@Component({
  selector: 'app-home-page',
  imports: [SliderComponent, BannerComponent, ProductListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
