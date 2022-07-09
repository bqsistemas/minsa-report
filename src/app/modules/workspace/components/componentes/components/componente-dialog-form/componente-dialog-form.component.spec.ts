import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDialogFormComponent } from './componente-dialog-form.component';

describe('ComponenteDialogFormComponent', () => {
  let component: ComponenteDialogFormComponent;
  let fixture: ComponentFixture<ComponenteDialogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteDialogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
