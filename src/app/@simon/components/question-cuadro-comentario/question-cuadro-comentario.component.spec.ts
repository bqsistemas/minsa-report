import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCuadroComentarioComponent } from './question-cuadro-comentario.component';

describe('QuestionCuadroComentarioComponent', () => {
  let component: QuestionCuadroComentarioComponent;
  let fixture: ComponentFixture<QuestionCuadroComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCuadroComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCuadroComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
