import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss } from '../../shared/utils';
import { SegmentedControlsMocks } from './segmented-control.mocks';
import { DsSegmentedControls } from './segmented-controls';

describe('SegmentedControls', () => {
  let component: DsSegmentedControls;
  let fixture: ComponentFixture<DsSegmentedControls>;
  let host: HTMLElement;

  const activeTextSelector = '.active .text';
  const forClickSelector = 'ds-segmented-control:nth-child(3)';
  const forKeydownSelector = 'ds-segmented-control:nth-child(5)';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSegmentedControls, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsSegmentedControls);
    component = fixture.componentInstance;
    host = fixture.componentRef.injector.get(ElementRef<HTMLElement>).nativeElement;
    fixture.componentRef.setInput('items', SegmentedControlsMocks);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Active item should be updated by model', () => {
    const active = SegmentedControlsMocks[1];
    const forClick = SegmentedControlsMocks[2];
    const forKeydown = SegmentedControlsMocks[3];

    fixture.componentRef.setInput('activeItemId', active.id);
    fixture.detectChanges();

    let activeText = getElementByCss(fixture, activeTextSelector)?.nativeElement;
    expect(activeText.textContent).toContain(active.text);

    getElementByCss(fixture, forClickSelector)?.triggerEventHandler('click');
    fixture.detectChanges();

    activeText = getElementByCss(fixture, activeTextSelector)?.nativeElement;
    expect(activeText.textContent).toContain(forClick.text);

    getElementByCss(fixture, forKeydownSelector)?.triggerEventHandler('keydown.enter');
    fixture.detectChanges();

    activeText = getElementByCss(fixture, activeTextSelector)?.nativeElement;
    expect(activeText.textContent).toContain(forKeydown.text);
  });
});
