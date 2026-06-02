import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsConditionBetween } from './condition-between';

describe('ConditionsFilterBetween', () => {
  let component: DsConditionBetween;
  let fixture: ComponentFixture<DsConditionBetween>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsConditionBetween],
    });

    fixture = TestBed.createComponent(DsConditionBetween);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should emit value changes', () => {
    const mockValue = {
      from: 1,
      to: 10,
    };

    (component as any).form.patchValue(mockValue);

    expect((component as any).value()).toStrictEqual(mockValue);
  });

  it('should get value from writeValue method', () => {
    const mockValue = {
      from: 1,
      to: 10,
    };

    component.writeValue(mockValue);

    expect((component as any).form.getRawValue()).toStrictEqual(mockValue);
  });
});
