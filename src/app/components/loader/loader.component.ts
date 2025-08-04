import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {

  
  public loaderService = inject(LoaderService);
  loading$ = this.loaderService.loading$

  ngOnInit(): void {
    // this.loading$ = this.loaderService.loading$;
  }

}
