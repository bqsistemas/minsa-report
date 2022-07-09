import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherOptionFormComponent } from './other-option-form.component';

describe('OtherOptionFormComponent', () => {
  let component: OtherOptionFormComponent;
  let fixture: ComponentFixture<OtherOptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherOptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
