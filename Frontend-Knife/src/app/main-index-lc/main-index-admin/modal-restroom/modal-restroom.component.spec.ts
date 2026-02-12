import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRestroomComponent } from './modal-restroom.component';

describe('ModalRestroomComponent', () => {
  let component: ModalRestroomComponent;
  let fixture: ComponentFixture<ModalRestroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRestroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRestroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
