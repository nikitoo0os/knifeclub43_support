import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBronComponent } from './modal-bron.component';

describe('ModalBronComponent', () => {
  let component: ModalBronComponent;
  let fixture: ComponentFixture<ModalBronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBronComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
