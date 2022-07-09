import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteIieeComponent } from './autocomplete-iiee.component';

describe('AutocompleteIieeComponent', () => {
  let component: AutocompleteIieeComponent;
  let fixture: ComponentFixture<AutocompleteIieeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteIieeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteIieeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
