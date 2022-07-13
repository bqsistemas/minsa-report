import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorDialogComponent } from './indicador-dialog.component';

describe('IndicadorDialogComponent', () => {
  let component: IndicadorDialogComponent;
  let fixture: ComponentFixture<IndicadorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
