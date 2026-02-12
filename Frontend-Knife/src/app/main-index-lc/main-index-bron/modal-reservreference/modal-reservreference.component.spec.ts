import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservreferenceComponent } from './modal-reservreference.component';

describe('ModalReservreferenceComponent', () => {
  let component: ModalReservreferenceComponent;
  let fixture: ComponentFixture<ModalReservreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReservreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReservreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
