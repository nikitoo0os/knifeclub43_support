import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIndexRulesComponent } from './main-index-rules.component';

describe('MainIndexRulesComponent', () => {
  let component: MainIndexRulesComponent;
  let fixture: ComponentFixture<MainIndexRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainIndexRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainIndexRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
