import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCuadroTextoSimpleComponent } from './question-cuadro-texto-simple.component';

describe('QuestionCuadroTextoSimpleComponent', () => {
  let component: QuestionCuadroTextoSimpleComponent;
  let fixture: ComponentFixture<QuestionCuadroTextoSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCuadroTextoSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCuadroTextoSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
