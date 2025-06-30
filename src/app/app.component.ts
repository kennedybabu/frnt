import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ButtonModule } from "primeng/button"


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frnt';
}
