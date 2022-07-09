import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboComponenteComponent } from './combo-componente.component';

describe('ComboComponenteComponent', () => {
  let component: ComboComponenteComponent;
  let fixture: ComponentFixture<ComboComponenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
