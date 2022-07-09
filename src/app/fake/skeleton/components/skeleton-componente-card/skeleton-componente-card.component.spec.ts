import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonComponenteCardComponent } from './skeleton-componente-card.component';

describe('SkeletonComponenteCardComponent', () => {
  let component: SkeletonComponenteCardComponent;
  let fixture: ComponentFixture<SkeletonComponenteCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonComponenteCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonComponenteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
