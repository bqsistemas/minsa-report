import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionCantidadComponent } from './resolve-question-cantidad.component';

describe('ResolveQuestionCantidadComponent', () => {
  let component: ResolveQuestionCantidadComponent;
  let fixture: ComponentFixture<ResolveQuestionCantidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionCantidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
