import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss } from '../../shared/utils';
import { SegmentedControlModel } from '../segmented-controls';
import { SegmentedControlsMocks } from '../segmented-controls/segmented-control.mocks';
import { DsSegmentedControl } from './segmented-control';

describe('SegmentedControl', () => {
  let component: DsSegmentedControl;
  let fixture: ComponentFixture<DsSegmentedControl>;
  let host: HTMLElement;

  const TEXT_SELECTOR = '[data-testid="control-text"]';
  const ICON_START_SELECTOR = '[data-testid="icon-start"]';
  const ICON_END_SELECTOR = '[data-testid="icon-end"]';

  const activeClass = 'active';
  const disabledClass = 'disabled';

  const prepareComponent = (item: SegmentedControlModel, active = false): void => {
    fixture.componentRef.setInput('text', item.text);
    fixture.componentRef.setInput('iconStart', item.iconStart);
    fixture.componentRef.setInput('iconEnd', item.iconEnd);
    fixture.componentRef.setInput('active', active);
    fixture.componentRef.setInput('disabled', item.disabled);

    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSegmentedControl],
    }).compileComponents();

    fixture = TestBed.createComponent(DsSegmentedControl);
    component = fixture.componentInstance;
    host = fixture.componentRef.injector.get(ElementRef<HTMLElement>).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show render active state right', () => {
    const item = SegmentedControlsMocks[0];
    prepareComponent(item);

    expect(host.classList.contains(activeClass)).toBeFalsy();

    prepareComponent(item, true);
    expect(host.classList.contains(activeClass)).toBeTruthy();
  });

  it('should show render disabled state right', () => {
    const enabledItem = SegmentedControlsMocks[0];
    const disabledItem = SegmentedControlsMocks[4];
    prepareComponent(enabledItem);

    expect(host.classList.contains(disabledClass)).toBeFalsy();

    prepareComponent(disabledItem);
    expect(host.classList.contains(disabledClass)).toBeTruthy();
  });

  it('should show only label', () => {
    const item = SegmentedControlsMocks[0];
    prepareComponent(item);

    const text = getElementByCss(fixture, TEXT_SELECTOR)?.nativeElement;
    const iconStart = getElementByCss(fixture, ICON_START_SELECTOR)?.nativeElement;
    const iconEnd = getElementByCss(fixture, ICON_END_SELECTOR)?.nativeElement;

    expect(text.textContent).toContain(item.text);
    expect(iconStart).toBeFalsy();
    expect(iconEnd).toBeFalsy();
  });

  it('should show only label and startIcon', () => {
    const item = SegmentedControlsMocks[1];
    prepareComponent(item);

    const text = getElementByCss(fixture, TEXT_SELECTOR)?.nativeElement;
    const iconStart = getElementByCss(fixture, ICON_START_SELECTOR)?.nativeElement;
    const iconEnd = getElementByCss(fixture, ICON_END_SELECTOR)?.nativeElement;

    expect(text.textContent).toContain(item.text);
    expect(iconStart).toBeTruthy();
    expect(iconEnd).toBeFalsy();
  });

  it('should show only label and endIcon', () => {
    const item = SegmentedControlsMocks[2];
    prepareComponent(item);

    const text = getElementByCss(fixture, TEXT_SELECTOR)?.nativeElement;
    const iconStart = getElementByCss(fixture, ICON_START_SELECTOR)?.nativeElement;
    const iconEnd = getElementByCss(fixture, ICON_END_SELECTOR)?.nativeElement;

    expect(text.textContent).toContain(item.text);
    expect(iconStart).toBeFalsy();
    expect(iconEnd).toBeTruthy();
  });

  it('should show only label and both icons', () => {
    const item = SegmentedControlsMocks[3];
    prepareComponent(item);

    const text = getElementByCss(fixture, TEXT_SELECTOR)?.nativeElement;
    const iconStart = getElementByCss(fixture, ICON_START_SELECTOR)?.nativeElement;
    const iconEnd = getElementByCss(fixture, ICON_END_SELECTOR)?.nativeElement;

    expect(text.textContent).toContain(item.text);
    expect(iconStart).toBeTruthy();
    expect(iconEnd).toBeTruthy();
  });
});
