import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCloseclubComponent } from './modal-closeclub.component';

describe('ModalCloseclubComponent', () => {
  let component: ModalCloseclubComponent;
  let fixture: ComponentFixture<ModalCloseclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCloseclubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCloseclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
