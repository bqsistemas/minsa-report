import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOpcionMultipleComponent } from './question-opcion-multiple.component';

describe('QuestionOpcionMultipleComponent', () => {
  let component: QuestionOpcionMultipleComponent;
  let fixture: ComponentFixture<QuestionOpcionMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionOpcionMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionOpcionMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
