import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFechaHoraComponent } from './question-fecha-hora.component';

describe('QuestionFechaHoraComponent', () => {
  let component: QuestionFechaHoraComponent;
  let fixture: ComponentFixture<QuestionFechaHoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFechaHoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFechaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
