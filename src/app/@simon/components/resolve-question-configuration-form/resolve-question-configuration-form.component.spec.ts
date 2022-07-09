import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionConfigurationFormComponent } from './resolve-question-configuration-form.component';

describe('ResolveQuestionConfigurationFormComponent', () => {
  let component: ResolveQuestionConfigurationFormComponent;
  let fixture: ComponentFixture<ResolveQuestionConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
