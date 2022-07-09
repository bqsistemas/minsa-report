import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesDataTableComponent } from './componentes-data-table.component';

describe('ComponentesDataTableComponent', () => {
  let component: ComponentesDataTableComponent;
  let fixture: ComponentFixture<ComponentesDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentesDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
