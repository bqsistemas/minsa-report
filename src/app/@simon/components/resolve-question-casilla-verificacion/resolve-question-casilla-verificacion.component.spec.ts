import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionCasillaVerificacionComponent } from './resolve-question-casilla-verificacion.component';

describe('ResolveQuestionCasillaVerificacionComponent', () => {
  let component: ResolveQuestionCasillaVerificacionComponent;
  let fixture: ComponentFixture<ResolveQuestionCasillaVerificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionCasillaVerificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionCasillaVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
