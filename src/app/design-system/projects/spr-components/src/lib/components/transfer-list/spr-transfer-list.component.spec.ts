import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, getElementsByCss, syncViewModel } from '../../shared/utils';
import { SprTransferListComponent } from './spr-transfer-list.component';

describe('SprTransferList', () => {
  let fixture: ComponentFixture<SprTransferListComponent>;
  let component: SprTransferListComponent;

  const SOURCE_LIST = [
    { name: 'Afghanistan', icon: 'bo-icon-general-workspace', value: 'AF' },
    { name: 'Andorra', icon: 'bo-icon-general-alert-octagon', value: 'AD' },
  ];
  const TARGET_LIST = [{ name: 'Ukraine', icon: 'bo-icon-general-workspace', value: 'UA' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, SprTransferListComponent],
    });

    fixture = TestBed.createComponent(SprTransferListComponent);

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
    it('should add header', () => {
      const TEXT = 'SomeTEXT';

      fixture.componentRef.setInput('visibleHeader', TEXT);
      fixture.componentRef.setInput('countriesHeader', TEXT);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.inner-header__title')?.nativeElement;

      expect(element.textContent?.trim()).toBe(`${TEXT} ${SOURCE_LIST.length} ${TEXT}`);
    });

    it('should add source header', () => {
      const TEXT = 'SomeTEXT';

      fixture.componentRef.setInput('sourceColumnHeader', TEXT);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.transfer-list__sources .transfer-list__controls-title')?.nativeElement;

      expect(element.textContent?.trim()).toBe(TEXT);
    });

    it('should add target header', () => {
      const TEXT = 'SomeTEXT';

      fixture.componentRef.setInput('targetColumnHeader', TEXT);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.transfer-list__targets .transfer-list__controls-title')?.nativeElement;

      expect(element.textContent?.trim()).toBe(TEXT);
    });

    it('should filter items', () => {
      const ITEM_NAME = SOURCE_LIST?.[0].name;

      (component as any).searchControl.patchValue(ITEM_NAME);

      syncViewModel(fixture);

      const elements: DebugElement[] = getElementsByCss(fixture, '.transfer-list__data-source-item');

      expect(elements.length).toBe(1);
    });
  });
});
