import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewQuestionDialogComponent } from './preview-question-dialog.component';

describe('PreviewQuestionDialogComponent', () => {
  let component: PreviewQuestionDialogComponent;
  let fixture: ComponentFixture<PreviewQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
