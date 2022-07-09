import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionCuadroComentarioComponent } from './resolve-question-cuadro-comentario.component';

describe('ResolveQuestionCuadroComentarioComponent', () => {
  let component: ResolveQuestionCuadroComentarioComponent;
  let fixture: ComponentFixture<ResolveQuestionCuadroComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionCuadroComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionCuadroComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
