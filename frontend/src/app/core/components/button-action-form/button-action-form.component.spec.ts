import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonActionFormComponent } from './button-action-form.component';

describe('ButtonActionFormComponent', () => {
  let component: ButtonActionFormComponent;
  let fixture: ComponentFixture<ButtonActionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonActionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
