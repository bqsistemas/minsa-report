import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonItemMenuComponent } from './skeleton-item-menu.component';

describe('SkeletonItemMenuComponent', () => {
  let component: SkeletonItemMenuComponent;
  let fixture: ComponentFixture<SkeletonItemMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonItemMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
