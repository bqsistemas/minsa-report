import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLayoutErrorComponent } from './custom-layout-error.component';

describe('CustomLayoutErrorComponent', () => {
  let component: CustomLayoutErrorComponent;
  let fixture: ComponentFixture<CustomLayoutErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLayoutErrorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLayoutErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
