import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsChartsInstrumentosPlanMuestrasIieeComponent } from './widgets-charts-instrumentos-plan-muestras-iiee.component';

describe('WidgetsChartsInstrumentosPlanMuestrasIieeComponent', () => {
  let component: WidgetsChartsInstrumentosPlanMuestrasIieeComponent;
  let fixture: ComponentFixture<WidgetsChartsInstrumentosPlanMuestrasIieeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsChartsInstrumentosPlanMuestrasIieeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsChartsInstrumentosPlanMuestrasIieeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
