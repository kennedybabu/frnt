import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ButtonModule } from "primeng/button"
import { HeaderComponent } from "./components/header/header.component";
import { SliderComponent } from "./components/slider/slider.component";
import { BannerComponent } from "./components/banner/banner.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, ButtonModule, HeaderComponent, SliderComponent, BannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frnt';
}
