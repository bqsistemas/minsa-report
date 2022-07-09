import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsChartsInstrumentosPlanMuestrasRegionalComponent } from './widgets-charts-instrumentos-plan-muestras-regional.component';

describe('WidgetsChartsInstrumentosPlanMuestrasRegionalComponent', () => {
  let component: WidgetsChartsInstrumentosPlanMuestrasRegionalComponent;
  let fixture: ComponentFixture<WidgetsChartsInstrumentosPlanMuestrasRegionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsChartsInstrumentosPlanMuestrasRegionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsChartsInstrumentosPlanMuestrasRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
