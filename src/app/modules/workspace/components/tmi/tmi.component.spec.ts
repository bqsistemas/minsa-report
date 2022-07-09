import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmiComponent } from './tmi.component';

describe('TmiComponent', () => {
  let component: TmiComponent;
  let fixture: ComponentFixture<TmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
