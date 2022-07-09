import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuestionCargaArchivosComponent } from './resolve-question-carga-archivos.component';

describe('ResolveQuestionCargaArchivosComponent', () => {
  let component: ResolveQuestionCargaArchivosComponent;
  let fixture: ComponentFixture<ResolveQuestionCargaArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveQuestionCargaArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveQuestionCargaArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
