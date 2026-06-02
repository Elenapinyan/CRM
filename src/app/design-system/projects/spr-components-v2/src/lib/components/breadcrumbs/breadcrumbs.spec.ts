import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss, getElementsByCss } from '../../shared/utils';
import { DsBreadcrumbs } from './breadcrumbs';
import { BreadcrumbItem } from './breadcrumbs.options';
import { RouterModule } from '@angular/router';

describe('Breadcrumbs', () => {
  let fixture: ComponentFixture<DsBreadcrumbs>;
  let component: DsBreadcrumbs;

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
  ] as BreadcrumbItem[];

  const ITEM_SELECTOR = '[data-testid="breadcrumb-item"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
    });

    fixture = TestBed.createComponent(DsBreadcrumbs);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('items', MOCK_ITEMS);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should have items rendered', () => {
      const elements = getElementsByCss(fixture, ITEM_SELECTOR);

      expect(elements.length).toBe(MOCK_ITEMS.length);
    });

    it('should disable routing on item click', () => {
      const element = getElementByCss(fixture, ITEM_SELECTOR).nativeElement as HTMLElement;

      expect(element.getAttribute('ng-reflect-router-link')).toBe(MOCK_ITEMS[0].path);

      fixture.componentRef.setInput('disableRouting', true);

      fixture.detectChanges();

      expect(element.getAttribute('ng-reflect-router-link')).toBe(null);
    });
  });
});
