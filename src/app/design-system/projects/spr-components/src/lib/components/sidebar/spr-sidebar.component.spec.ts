import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprSidebarComponent } from './spr-sidebar.component';
import { SidebarNavItem } from './interfaces/sidebar.interface';
import { Router, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ template: '', changeDetection: ChangeDetectionStrategy.OnPush })
class DummyComponent {}

describe('SprSidebarComponent', () => {
  let fixture: ComponentFixture<SprSidebarComponent>;
  let component: SprSidebarComponent;
  let router: Router;

  const MOCK_ITEMS: SidebarNavItem[] = [
    {
      label: 'Menu Item 1',
      routerLink: '/',
    },
    {
      label: 'Menu Item 2',
      routerLink: '/2',
      subNavs: [
        {
          label: 'Menu Item 2.1',
          routerLink: '/2/1',
        },
      ],
    },
    {
      label: 'Menu Item 3',
      routerLink: '/3',
      subNavs: [
        {
          label: 'Menu Item 3.1',
          routerLink: '/3/1',
        },
      ],
    },
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: DummyComponent },
          { path: '2', component: DummyComponent },
          { path: '2/1', component: DummyComponent },
          { path: '3', component: DummyComponent },
        ]),
      ],
    });

    fixture = TestBed.createComponent(SprSidebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.componentRef.setInput('items', MOCK_ITEMS);
    fixture.detectChanges();
  });

  describe('Model & Logic', () => {
    it('should automatically expand menu if route is active on init', async () => {
      await router.navigateByUrl('/2/1');

      fixture.componentRef.setInput('items', MOCK_ITEMS);
      fixture.detectChanges();

      await fixture.whenStable();

      const expandedLabel = (component as any).expandedLabel();

      expect(expandedLabel).toBe('Menu Item 2');
    });

    it('should initially be collapsed', () => {
      expect((component as any).expandedLabel()).toBeNull();
    });

    it('should expand an item when clicked', () => {
      (component as any).toggleItem(MOCK_ITEMS[1]);

      fixture.detectChanges();

      expect((component as any).expandedLabel()).toBe('Menu Item 2');
    });

    it('should collapse an item when clicked again', () => {
      (component as any).toggleItem(MOCK_ITEMS[1]);

      fixture.detectChanges();

      expect((component as any).expandedLabel()).toBe('Menu Item 2');

      (component as any).toggleItem(MOCK_ITEMS[1]);
      fixture.detectChanges();

      expect((component as any).expandedLabel()).toBeNull();
    });

    it('should implement accordion behavior (close previous item when opening new one)', () => {
      (component as any).toggleItem(MOCK_ITEMS[1]);

      fixture.detectChanges();

      (component as any).toggleItem(MOCK_ITEMS[2]);

      fixture.detectChanges();

      expect((component as any).expandedLabel()).toBe('Menu Item 3');
    });

    it('should NOT expand item if it has no sub-navigation', () => {
      const itemWithoutSubs = MOCK_ITEMS[0];

      (component as any).toggleItem(itemWithoutSubs);

      fixture.detectChanges();

      expect((component as any).expandedLabel()).toBeNull();
    });
  });

  describe('View', () => {
    it('should display title', () => {
      const TITLE_MOCK = 'My Sidebar';

      fixture.componentRef.setInput('title', TITLE_MOCK);
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(By.css('.sidebar__title')).nativeElement;
      expect(titleEl.textContent.trim()).toBe(TITLE_MOCK);
    });

    it('should render correct number of items', () => {
      fixture.componentRef.setInput('items', MOCK_ITEMS);
      fixture.detectChanges();

      const elements = fixture.debugElement.queryAll(By.css('.sidebar__list-item'));

      expect(elements.length).toBe(MOCK_ITEMS.length);
    });
  });
});
