import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detail',
  imports: [TabsModule, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

}
