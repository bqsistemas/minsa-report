import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesTableMenuComponent } from './componentes-table-menu.component';

describe('ComponentesTableMenuComponent', () => {
  let component: ComponentesTableMenuComponent;
  let fixture: ComponentFixture<ComponentesTableMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentesTableMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesTableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
