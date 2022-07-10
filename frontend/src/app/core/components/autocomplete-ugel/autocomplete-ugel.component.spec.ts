import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteUgelComponent } from './autocomplete-ugel.component';

describe('AutocompleteUgelComponent', () => {
  let component: AutocompleteUgelComponent;
  let fixture: ComponentFixture<AutocompleteUgelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteUgelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteUgelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
