import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeFormComponent } from './question-type-form.component';

describe('QuestionTypeFormComponent', () => {
  let component: QuestionTypeFormComponent;
  let fixture: ComponentFixture<QuestionTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
