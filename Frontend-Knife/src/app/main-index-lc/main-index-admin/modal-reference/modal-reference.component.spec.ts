import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReferenceComponent } from './modal-reference.component';

describe('ModalReferenceComponent', () => {
  let component: ModalReferenceComponent;
  let fixture: ComponentFixture<ModalReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
