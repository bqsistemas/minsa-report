import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsChartsInstrumentosPlanMuestrasLocalComponent } from './widgets-charts-instrumentos-plan-muestras-local.component';

describe('WidgetsChartsInstrumentosPlanMuestrasLocalComponent', () => {
  let component: WidgetsChartsInstrumentosPlanMuestrasLocalComponent;
  let fixture: ComponentFixture<WidgetsChartsInstrumentosPlanMuestrasLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsChartsInstrumentosPlanMuestrasLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsChartsInstrumentosPlanMuestrasLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
