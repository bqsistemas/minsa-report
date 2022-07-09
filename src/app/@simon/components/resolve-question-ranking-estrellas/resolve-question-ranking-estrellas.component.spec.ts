import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionRankingEstrellasComponent } from './resolve-question-ranking-estrellas.component';

describe('ResolveQuestionRankingEstrellasComponent', () => {
  let component: ResolveQuestionRankingEstrellasComponent;
  let fixture: ComponentFixture<ResolveQuestionRankingEstrellasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionRankingEstrellasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionRankingEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
