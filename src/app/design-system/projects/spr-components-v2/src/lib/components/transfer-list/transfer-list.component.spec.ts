import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, getElementsByCss, syncViewModel } from '../../shared/utils';
import { TransferListComponent } from './transfer-list.component';

describe('DsTransferList', () => {
  let fixture: ComponentFixture<TransferListComponent>;
  let component: TransferListComponent;

  const SOURCE_LIST = [
    { name: 'Afghanistan', icon: 'ds-icon-general-workspace', value: 'AF' },
    { name: 'Andorra', icon: 'ds-icon-general-alert-octagon', value: 'AD' },
  ];
  const TARGET_LIST = [{ name: 'Ukraine', icon: 'ds-icon-general-workspace', value: 'UA' }];

  const SOURCE_HEADER_SELECTOR = '[data-testid="source-header"]';
  const TARGET_HEADER_SELECTOR = '[data-testid="target-header"]';
  const SOURCE_ITEM_SELECTOR = '[data-testid="source-item"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, TransferListComponent],
    });

    fixture = TestBed.createComponent(TransferListComponent);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('sourceList', SOURCE_LIST);
    fixture.componentRef.setInput('targetList', TARGET_LIST);

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should move one item to targetList', () => {
      const ITEM = component.sourceList()?.[0];

      component.moveToTarget(ITEM);

      expect(component.targetList()).toContain(ITEM);
    });

    it('should move all items to targetList', () => {
      component.moveAllToTarget();

      expect(component.targetList().length).toBe(SOURCE_LIST.length + TARGET_LIST.length);
    });

    it('should move one item to sourceList', () => {
      const ITEM = component.targetList()?.[0];

      component.moveToSource(ITEM);

      expect(component.sourceList()).toContain(ITEM);
    });

    it('should move all items to sourceList', () => {
      component.moveAllToSource();

      expect(component.sourceList().length).toBe(SOURCE_LIST.length + TARGET_LIST.length);
    });
  });

  describe('View', () => {
    it('should add source header', () => {
      const TEXT = 'SomeTEXT';

      fixture.componentRef.setInput('sourceColumnHeader', TEXT);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, SOURCE_HEADER_SELECTOR)?.nativeElement;

      expect(element.textContent?.trim()).toBe(TEXT);
    });

    it('should add target header', () => {
      const TEXT = 'SomeTEXT';

      fixture.componentRef.setInput('targetColumnHeader', TEXT);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, TARGET_HEADER_SELECTOR)?.nativeElement;

      expect(element.textContent?.trim()).toBe(TEXT);
    });

    it('should filter items', () => {
      const ITEM_NAME = SOURCE_LIST?.[0].name;

      (component as any).searchControl.patchValue(ITEM_NAME);

      syncViewModel(fixture);

      const elements: DebugElement[] = getElementsByCss(fixture, SOURCE_ITEM_SELECTOR);

      expect(elements.length).toBe(1);
    });
  });
});
