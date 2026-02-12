import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditReservreferenceComponent } from './modal-edit-reservreference.component';

describe('ModalEditReservreferenceComponent', () => {
  let component: ModalEditReservreferenceComponent;
  let fixture: ComponentFixture<ModalEditReservreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditReservreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditReservreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
