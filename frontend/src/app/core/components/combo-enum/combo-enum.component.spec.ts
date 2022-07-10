import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboEnumComponent } from './combo-enum.component';

describe('ComboEnumComponent', () => {
  let component: ComboEnumComponent;
  let fixture: ComponentFixture<ComboEnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboEnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboEnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
