import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservrestroomComponent } from './modal-reservrestroom.component';

describe('ModalReservrestroomComponent', () => {
  let component: ModalReservrestroomComponent;
  let fixture: ComponentFixture<ModalReservrestroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReservrestroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReservrestroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
