import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsChartsInstrumentosPlanMuestrasComponent } from './widgets-charts-instrumentos-plan-muestras.component';

describe('WidgetsChartsInstrumentosPlanMuestrasComponent', () => {
  let component: WidgetsChartsInstrumentosPlanMuestrasComponent;
  let fixture: ComponentFixture<WidgetsChartsInstrumentosPlanMuestrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsChartsInstrumentosPlanMuestrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsChartsInstrumentosPlanMuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
