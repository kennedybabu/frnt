import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtProductsComponent } from './ft-products.component';

describe('FtProductsComponent', () => {
  let component: FtProductsComponent;
  let fixture: ComponentFixture<FtProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FtProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
