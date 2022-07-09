import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRankingEstrellasComponent } from './question-ranking-estrellas.component';

describe('QuestionRankingEstrellasComponent', () => {
  let component: QuestionRankingEstrellasComponent;
  let fixture: ComponentFixture<QuestionRankingEstrellasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRankingEstrellasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRankingEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
