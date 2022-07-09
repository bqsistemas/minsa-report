import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteDreComponent } from './autocomplete-dre.component';

describe('AutocompleteDreComponent', () => {
  let component: AutocompleteDreComponent;
  let fixture: ComponentFixture<AutocompleteDreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteDreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteDreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
