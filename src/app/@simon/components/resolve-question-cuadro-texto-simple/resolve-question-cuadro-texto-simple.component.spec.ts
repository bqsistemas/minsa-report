import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionCuadroTextoSimpleComponent } from './resolve-question-cuadro-texto-simple.component';

describe('ResolveQuestionCuadroTextoSimpleComponent', () => {
  let component: ResolveQuestionCuadroTextoSimpleComponent;
  let fixture: ComponentFixture<ResolveQuestionCuadroTextoSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionCuadroTextoSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionCuadroTextoSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
