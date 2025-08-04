import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ButtonModule } from "primeng/button"
import { HeaderComponent } from "./components/header/header.component";
import { SliderComponent } from "./components/slider/slider.component";
import { BannerComponent } from "./components/banner/banner.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoaderComponent } from "./components/loader/loader.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frnt';
}
