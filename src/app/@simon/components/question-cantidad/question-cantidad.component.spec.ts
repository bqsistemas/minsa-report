import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCantidadComponent } from './question-cantidad.component';

describe('QuestionCantidadComponent', () => {
  let component: QuestionCantidadComponent;
  let fixture: ComponentFixture<QuestionCantidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCantidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
