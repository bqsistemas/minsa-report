import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsChartsInstrumentosPlanProgramacionMonitorComponent } from './widgets-charts-instrumentos-plan-programacion-monitor.component';

describe('WidgetsChartsInstrumentosPlanProgramacionMonitorComponent', () => {
  let component: WidgetsChartsInstrumentosPlanProgramacionMonitorComponent;
  let fixture: ComponentFixture<WidgetsChartsInstrumentosPlanProgramacionMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsChartsInstrumentosPlanProgramacionMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsChartsInstrumentosPlanProgramacionMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
