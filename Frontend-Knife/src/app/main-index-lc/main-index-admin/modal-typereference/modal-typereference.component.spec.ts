import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBirthdayComponent } from './modal-typereference.component';

describe('ModalTypereferenceComponent', () => {
  let component: ModalBirthdayComponent;
  let fixture: ComponentFixture<ModalBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBirthdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
