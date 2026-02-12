import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIndexBronComponent } from './main-index-bron.component';

describe('MainIndexBronComponent', () => {
  let component: MainIndexBronComponent;
  let fixture: ComponentFixture<MainIndexBronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainIndexBronComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainIndexBronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
