import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorTableComponent } from './indicador-table.component';

describe('IndicadorTableComponent', () => {
  let component: IndicadorTableComponent;
  let fixture: ComponentFixture<IndicadorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
