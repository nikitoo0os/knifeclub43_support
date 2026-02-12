import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewImgComponent } from './modal-view-img.component';

describe('ModalViewImgComponent', () => {
  let component: ModalViewImgComponent;
  let fixture: ComponentFixture<ModalViewImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
