import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsFilterInnerHeader } from './filter-inner-header';

describe('FilterInnerHeader', () => {
  let component: DsFilterInnerHeader;
  let fixture: ComponentFixture<DsFilterInnerHeader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsFilterInnerHeader],
    });

    fixture = TestBed.createComponent(DsFilterInnerHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
