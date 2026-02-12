import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIndexAdminComponent } from './main-index-admin.component';

describe('MainIndexAdminComponent', () => {
  let component: MainIndexAdminComponent;
  let fixture: ComponentFixture<MainIndexAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainIndexAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainIndexAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
