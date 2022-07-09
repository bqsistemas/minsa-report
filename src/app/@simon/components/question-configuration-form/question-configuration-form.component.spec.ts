import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionConfigurationFormComponent } from './question-configuration-form.component';

describe('QuestionConfigurationFormComponent', () => {
  let component: QuestionConfigurationFormComponent;
  let fixture: ComponentFixture<QuestionConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
