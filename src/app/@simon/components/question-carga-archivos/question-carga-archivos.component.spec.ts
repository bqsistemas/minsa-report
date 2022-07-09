import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCargaArchivosComponent } from './question-carga-archivos.component';

describe('QuestionCargaArchivosComponent', () => {
  let component: QuestionCargaArchivosComponent;
  let fixture: ComponentFixture<QuestionCargaArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCargaArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCargaArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
