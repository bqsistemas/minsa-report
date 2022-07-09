import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCasillaVerificacionComponent } from './question-casilla-verificacion.component';

describe('QuestionCasillaVerificacionComponent', () => {
  let component: QuestionCasillaVerificacionComponent;
  let fixture: ComponentFixture<QuestionCasillaVerificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCasillaVerificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCasillaVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
