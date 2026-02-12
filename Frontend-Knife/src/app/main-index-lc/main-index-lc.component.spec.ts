import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIndexLcComponent } from './main-index-lc.component';

describe('MainIndexLcComponent', () => {
  let component: MainIndexLcComponent;
  let fixture: ComponentFixture<MainIndexLcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainIndexLcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainIndexLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
