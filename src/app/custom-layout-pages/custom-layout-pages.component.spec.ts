import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLayoutPagesComponent } from './custom-layout-pages.component';

describe('CustomLayoutPagesComponent', () => {
  let component: CustomLayoutPagesComponent;
  let fixture: ComponentFixture<CustomLayoutPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLayoutPagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLayoutPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
