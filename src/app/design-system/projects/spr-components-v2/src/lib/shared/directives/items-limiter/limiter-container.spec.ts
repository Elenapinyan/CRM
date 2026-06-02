import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, input, viewChild } from '@angular/core';
import { SprLimiterItemDirective } from './limiter-item';
import { SprLimiterContainerDirective } from './limiter-container';
import { getElementByCss } from '../../utils';
import { MockResizeObserver } from '../../mocks';

type SomeItem = {
  name: string;
  path: string;
};

@Component({
  template: `
    <div class="block" [sprLimiterContainer]="items()" (collapsedItems)="setCollapsedItems($event)">
      @for (item of items(); track item.name) {
        <div class="breadcrumb-item" *sprLimiterItem="item">
          {{ item.name }}
        </div>
      }
    </div>
  `,
  imports: [SprLimiterItemDirective, SprLimiterContainerDirective],
})
class MockComponent {
  items = input<SomeItem[]>([]);
  directive = viewChild(SprLimiterContainerDirective);

  collapsedItems: SomeItem[] = [];

  setCollapsedItems(items: SomeItem[]): void {
    this.collapsedItems = items;
  }
}

function fakeResizeEntry(target: HTMLElement, width: number, height: number): ResizeObserverEntry {
  return {
    target,
    contentRect: {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: height,
      right: width,
      width,
      height,
      toJSON: () => {},
    },
    borderBoxSize: [] as any,
    contentBoxSize: [] as any,
    devicePixelContentBoxSize: [] as any,
  } as ResizeObserverEntry;
}

function setClientRectMock(itemWidth: number, containerWidth: number): void {
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement): DOMRect {
    if (this.classList?.contains('breadcrumb-item')) {
      return { x: 0, y: 0, top: 0, left: 0, bottom: 200, right: 300, width: itemWidth, height: 40, toJSON() {} } as DOMRect;
    }

    if (this.classList?.contains('block')) {
      return {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        bottom: 200,
        right: 300,
        width: containerWidth,
        height: 40,
        toJSON() {},
      } as DOMRect;
    }

    return { x: 0, y: 0, top: 0, left: 0, bottom: 100, right: 100, width: 100, height: 40, toJSON() {} } as DOMRect;
  });
}

describe('LimiterContainer', () => {
  let fixture: ComponentFixture<MockComponent>;
  let component: MockComponent;
  let directive: SprLimiterContainerDirective;

  const MOCK_ITEM_WIDTH = 50;
  const MOCK_ITEMS = [
    {
      name: 'Route 1',
      path: '/home/route-1',
    },
    {
      name: 'Route 2',
      path: '/home/route-2',
    },
    {
      name: 'Route 3',
      path: '/home/route-3',
    },
    {
      name: 'Route 4',
      path: '/home/route-4',
    },
    {
      name: 'Route 5',
      path: '/home/route-5',
    },
    {
      name: 'Route 6',
      path: '/home/route-6',
    },
  ] as SomeItem[];
  let mockContainerWidth = 205;

  const getSizes = (itemsWidth: number = MOCK_ITEM_WIDTH * MOCK_ITEMS.length, containerWidth = mockContainerWidth): any => ({
    itemsWidth,
    containerWidth,
  });

  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);

    component = fixture.componentInstance;

    directive = component.directive()!;
  });

  beforeEach(() => {
    setClientRectMock(MOCK_ITEM_WIDTH, mockContainerWidth);

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      Promise.resolve().then(() => cb(300));
      return 1;
    });
  });

  describe('Model', () => {
    it('should emit setCollapsedItems method on item added', fakeAsync(() => {
      // mock sizes like it work in real dom
      jest
        .spyOn(directive as any, 'getSizes')
        .mockReturnValueOnce(getSizes(300)) // check method
        .mockReturnValueOnce(getSizes(300)) // limit method
        .mockReturnValueOnce(getSizes(250))
        .mockReturnValueOnce(getSizes(200))
        .mockReturnValueOnce(getSizes(150))
        .mockReturnValueOnce(getSizes(100))
        .mockReturnValueOnce(getSizes(50));

      const spy = jest.spyOn(component, 'setCollapsedItems');

      fixture.componentRef.setInput('items', MOCK_ITEMS);

      fixture.detectChanges();

      tick(300);

      expect(spy).toHaveBeenCalledTimes(1);
    }));

    describe('Items limitation', () => {
      beforeEach(() => {
        // mock sizes like it work in real dom
        jest
          .spyOn(directive as any, 'getSizes')
          .mockReturnValueOnce(getSizes(300)) // check method
          .mockReturnValueOnce(getSizes(300)) // limit method
          .mockReturnValueOnce(getSizes(250))
          .mockReturnValueOnce(getSizes(200))
          .mockReturnValueOnce(getSizes(150))
          .mockReturnValueOnce(getSizes(100))
          .mockReturnValueOnce(getSizes(50));
      });

      it('should correctly limit items', fakeAsync(() => {
        fixture.componentRef.setInput('items', MOCK_ITEMS);

        fixture.detectChanges();

        tick(300);

        expect(directive['limitedItems']().length).toBe(2);
      }));

      it('should not limit if there is enough space', fakeAsync(() => {
        mockContainerWidth = MOCK_ITEMS.length * MOCK_ITEM_WIDTH + 1;

        fixture.componentRef.setInput('items', MOCK_ITEMS);

        fixture.detectChanges();

        tick(300);

        expect(directive['limitedItems']().length).toBe(2);
      }));
    });

    describe('Items returning', () => {
      beforeEach(() => {
        // mock sizes like it work in real dom
        jest
          .spyOn(directive as any, 'getSizes')
          .mockReturnValueOnce(getSizes(300, 105)) // check method
          .mockReturnValueOnce(getSizes(300, 105)) // limit
          .mockReturnValueOnce(getSizes(250, 105))
          .mockReturnValueOnce(getSizes(200, 105))
          .mockReturnValueOnce(getSizes(150, 105))
          .mockReturnValueOnce(getSizes(100, 105))
          .mockReturnValueOnce(getSizes(100, 205)) // check
          .mockReturnValueOnce(getSizes(100, 205)) // return
          .mockReturnValueOnce(getSizes(150, 205))
          .mockReturnValueOnce(getSizes(200, 205))
          .mockReturnValueOnce(getSizes(250, 205))
          .mockReturnValueOnce(getSizes(300, 205));

        fixture.componentRef.setInput('items', MOCK_ITEMS);

        fixture.detectChanges();
      });

      it('should correctly return items', fakeAsync(() => {
        const spy = jest.spyOn(directive as any, 'returnLimitedItems');

        directive['checkItemsFitContainer']();

        tick(300);

        expect(spy).toHaveBeenCalledTimes(3);
        expect(directive['limitedItems']().length).toBe(2);
      }));
    });
  });

  describe('View', () => {
    it('should limit on resize', fakeAsync(() => {
      mockContainerWidth = 205;

      jest
        .spyOn(directive as any, 'getSizes')
        .mockReturnValueOnce(getSizes(300)) // check method
        .mockReturnValueOnce(getSizes(300)) // limit method
        .mockReturnValueOnce(getSizes(250))
        .mockReturnValueOnce(getSizes(200))
        .mockReturnValueOnce(getSizes(150, 141))
        .mockReturnValueOnce(getSizes(100))
        .mockReturnValueOnce(getSizes(50));

      fixture.componentRef.setInput('items', MOCK_ITEMS);

      fixture.detectChanges();
      tick(300);

      const container = getElementByCss(fixture, '.block');
      const observer = MockResizeObserver.findByTarget(container.nativeElement);

      observer?.trigger([fakeResizeEntry(container.nativeElement, 205, 40)]);

      fixture.detectChanges();
      tick(300);

      observer?.trigger([fakeResizeEntry(container.nativeElement, 141, 40)]);

      fixture.detectChanges();
      tick(300);

      expect(directive['limitedItems']().length).toBe(3);
    }));

    it('should return on resize', fakeAsync(() => {
      mockContainerWidth = 205;

      jest
        .spyOn(directive as any, 'getSizes')
        .mockReturnValueOnce(getSizes(300)) // check method
        .mockReturnValueOnce(getSizes(300)) // limit method
        .mockReturnValueOnce(getSizes(250))
        .mockReturnValueOnce(getSizes(200))
        .mockReturnValueOnce(getSizes(200, 251))
        .mockReturnValueOnce(getSizes(250, 251))
        .mockReturnValueOnce(getSizes(300, 251));

      fixture.componentRef.setInput('items', MOCK_ITEMS);

      fixture.detectChanges();
      tick(300);

      const container = getElementByCss(fixture, '.block');
      const observer = MockResizeObserver.findByTarget(container.nativeElement);

      observer?.trigger([fakeResizeEntry(container.nativeElement, 205, 40)]);
      fixture.detectChanges();
      tick(300);

      observer?.trigger([fakeResizeEntry(container.nativeElement, 251, 40)]);
      fixture.detectChanges();
      tick(300);

      expect(directive['limitedItems']().length).toBe(1);
    }));
  });
});
