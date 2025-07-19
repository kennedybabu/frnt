import { Component, inject, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScroll } from 'primeng/animateonscroll';



@Component({
  selector: 'app-slider',
  imports: [RouterModule, CarouselModule, CommonModule, ButtonModule, AnimateOnScroll],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {

  productCategories!: ProductCategory[];

  productService = inject(ProductService)
  responsiveOptions: any[] | undefined;

  carouselItems = [
    { image: 'images/bg/teal_bg.jpg', alt: 'Teal background' , text: 'Secure Payment'},
    { image: 'images/bg/pink_bg.jpg', alt: 'Pink background' , text: 'Browse, Safely & Shop'},
  ];


  ngOnInit(): void {
    this.listProductCategories();

    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
  ]
  }


  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    )
  }

  
}
