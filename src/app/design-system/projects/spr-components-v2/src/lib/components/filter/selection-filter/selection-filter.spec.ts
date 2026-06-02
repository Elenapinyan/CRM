import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSelectionFilter } from './selection-filter';
import { MockResizeObserver } from '../../../shared/mocks';

describe('SelectionFilter', () => {
  let component: DsSelectionFilter;
  let fixture: ComponentFixture<DsSelectionFilter>;

  const MOCK_OPTIONS = [
    { text: 'Spribe', value: 1, isDisabled: true },
    { text: 'Aviator', value: 2, icon: 'ds-icon-general-trophy' },
    { text: 'Georgia', value: 3 },
    { text: 'Ukraine', value: 4 },
    { text: 'Moldova', value: 5 },
    { text: 'Poland', value: 6 },
    { text: 'Austria', value: 7 },
    { text: 'Slovakia', value: 8 },
    { text: 'Switzerland', value: 9 },
    { text: 'Germany', value: 10 },
    { text: 'Czech', value: 11 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSelectionFilter],
    }).compileComponents();

    global.ResizeObserver = MockResizeObserver;

    fixture = TestBed.createComponent(DsSelectionFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should updateSelectedValue', () => {
    (component as any).updateSelectedValue(MOCK_OPTIONS[1].value);

    const v = (component as any).value();

    expect(v).toBe(MOCK_OPTIONS[1].value);
  });

  it('should apply value if disableAutoApply === false', () => {
    component.disableAutoApply(false);
    (component as any).selectedOptions.set([MOCK_OPTIONS[1]]);
    (component as any).updateSelectedValue(MOCK_OPTIONS[1].value);

    const v = (component as any).appliedOptions();

    expect(v).toStrictEqual([MOCK_OPTIONS[1]]);
  });

  it('should not apply value if disableAutoApply === true', () => {
    component.disableAutoApply(true);
    (component as any).selectedOptions.set([MOCK_OPTIONS[1]]);
    (component as any).updateSelectedValue(MOCK_OPTIONS[1].value);

    const v = (component as any).appliedOptions();

    expect(v).toStrictEqual([]);
  });
});
