import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TransferListItemComponent } from './transfer-list-item.component';
import { getElementByCss } from '../../../shared/utils';

describe('SprTransferListItem', () => {
  let fixture: ComponentFixture<TransferListItemComponent>;
  let component: TransferListItemComponent;

  const SOURCE_LIST_ITEM = {
    name: 'Europe',
    icon: 'bo-icon-general-workspace',
    value: 'eu',
    children: [{ name: 'Poland', icon: '', value: 'Po', category: 'Europe' }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(TransferListItemComponent);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('value', SOURCE_LIST_ITEM);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should move one item to targetList', () => {
      const spyOnEmit = jest.spyOn(component.moveItem, 'emit');
      const spyOnMove = jest.spyOn(component as any, 'move');

      const element = getElementByCss(fixture, '[data-testid="btn-move"]')?.nativeElement as HTMLElement;

      element.click();
      fixture.detectChanges();

      expect(spyOnMove).toHaveBeenCalledTimes(1);
      expect(spyOnEmit).toHaveBeenCalledTimes(1);
    });

    it('should toggle children', () => {
      const spyOnToggle = jest.spyOn(component as any, 'toggleChildren');
      (component as any).isOpened.set(false);

      const element = getElementByCss(fixture, '[data-testid="list-toggle"]')?.nativeElement as HTMLElement;

      element.click();
      fixture.detectChanges();

      expect(spyOnToggle).toHaveBeenCalledTimes(1);
      expect((component as any).isOpened()).toBeTruthy();
    });
  });
});
