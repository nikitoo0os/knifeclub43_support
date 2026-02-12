import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImgreferenceComponent } from './modal-imgreference.component';

describe('ModalImgreferenceComponent', () => {
  let component: ModalImgreferenceComponent;
  let fixture: ComponentFixture<ModalImgreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImgreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImgreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
