import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIndexStockComponent } from './main-index-stock.component';

describe('MainIndexStockComponent', () => {
  let component: MainIndexStockComponent;
  let fixture: ComponentFixture<MainIndexStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainIndexStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainIndexStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
