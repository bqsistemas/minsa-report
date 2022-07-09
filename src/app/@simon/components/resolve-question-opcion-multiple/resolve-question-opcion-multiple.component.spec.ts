import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionOpcionMultipleComponent } from './resolve-question-opcion-multiple.component';

describe('ResolveQuestionOpcionMultipleComponent', () => {
  let component: ResolveQuestionOpcionMultipleComponent;
  let fixture: ComponentFixture<ResolveQuestionOpcionMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionOpcionMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionOpcionMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
