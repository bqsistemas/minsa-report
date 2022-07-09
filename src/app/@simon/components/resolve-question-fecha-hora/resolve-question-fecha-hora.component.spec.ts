import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionFechaHoraComponent } from './resolve-question-fecha-hora.component';

describe('ResolveQuestionFechaHoraComponent', () => {
  let component: ResolveQuestionFechaHoraComponent;
  let fixture: ComponentFixture<ResolveQuestionFechaHoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionFechaHoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionFechaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
