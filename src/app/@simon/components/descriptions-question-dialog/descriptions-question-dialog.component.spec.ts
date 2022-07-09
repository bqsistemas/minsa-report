import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionsQuestionDialogComponent } from './descriptions-question-dialog.component';

describe('DescriptionsQuestionDialogComponent', () => {
  let component: DescriptionsQuestionDialogComponent;
  let fixture: ComponentFixture<DescriptionsQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionsQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionsQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
