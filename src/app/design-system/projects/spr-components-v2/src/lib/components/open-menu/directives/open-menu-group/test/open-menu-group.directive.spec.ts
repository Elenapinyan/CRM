import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DsOpenMenuGroupTestComponent } from './open-menu-group-test.component';
import { DsOpenGroupMenuDirective } from '../open-menu-group.directive';

describe('DsOpenGroupMenuDirective', () => {
  let fixture: ComponentFixture<DsOpenMenuGroupTestComponent>;
  let hostComponent: DsOpenMenuGroupTestComponent;

  let groupMenuDe: DebugElement;
  let groupMenuDirective: DsOpenGroupMenuDirective;

  function openMainMenuAndFindGroupMenu(): void {
    const buttonDe = fixture.debugElement.query(By.css('button[dsOpenMenu]'));
    buttonDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    groupMenuDe = fixture.debugElement.query(By.directive(DsOpenGroupMenuDirective));
    groupMenuDirective = groupMenuDe.injector.get(DsOpenGroupMenuDirective);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsOpenMenuGroupTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsOpenMenuGroupTestComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    openMainMenuAndFindGroupMenu();
  });

  it('should create DsOpenGroupMenuDirective instance', () => {
    expect(groupMenuDirective).toBeTruthy();
  });

  it('should render title container and chevron on init', () => {
    const hostElement: HTMLElement = groupMenuDe.nativeElement;

    const titleContainer = hostElement.querySelector('.open-group-menu-title-container') as HTMLDivElement | null;

    expect(titleContainer !== null).toBe(true);

    const chevron = titleContainer!.querySelector('i.ds-icon') as HTMLElement | null;
    expect(chevron !== null).toBe(true);

    expect(chevron!.classList.contains('ds-icon-arrows-chevron-right')).toBe(true);
    expect(chevron!.classList.contains('ds-icon-arrows-chevron-down')).toBe(false);
  });

  it('should toggle isOpen and chevron classes on host click', () => {
    const hostElement: HTMLElement = groupMenuDe.nativeElement;
    const titleContainer = hostElement.querySelector('.open-group-menu-title-container') as HTMLElement;
    const chevron = titleContainer.querySelector('i.ds-icon') as HTMLElement;

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(groupMenuDirective.isOpen).toBe(true);
    expect(chevron.classList.contains('ds-icon-arrows-chevron-down')).toBe(true);
    expect(chevron.classList.contains('ds-icon-arrows-chevron-right')).toBe(false);

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(groupMenuDirective.isOpen).toBe(false);
    expect(chevron.classList.contains('ds-icon-arrows-chevron-right')).toBe(true);
    expect(chevron.classList.contains('ds-icon-arrows-chevron-down')).toBe(false);
  });

  it('should emit visibilityChange on toggle', () => {
    const emitted: boolean[] = [];
    groupMenuDirective.visibilityChange.subscribe((value) => emitted.push(value));

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(emitted).toEqual([true, false]);
  });

  it('should render list and items when opened', () => {
    const hostElement: HTMLElement = groupMenuDe.nativeElement;

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    const list = hostElement.querySelector('ul.open-group-menu-list') as HTMLUListElement | null;
    expect(list !== null).toBe(true);

    const items = Array.from(list!.querySelectorAll('li'));
    expect(items.length).toBe(1);

    const itemText = items[0].textContent?.trim();
    expect(itemText).toBe('Open Menu First Item');
  });

  it('should remove list and items when closed', () => {
    const hostElement: HTMLElement = groupMenuDe.nativeElement;

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(hostElement.querySelector('ul.open-group-menu-list') !== null).toBe(true);

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(hostElement.querySelector('ul.open-group-menu-list') === null).toBe(true);
  });

  it('should close group menu on child click when closeGroupMenuOnChildClick = true and closeEntireMenuOnChildClick = false', () => {
    const hostElement: HTMLElement = groupMenuDe.nativeElement;
    groupMenuDirective.closeEntireMenuOnChildClick = false;

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    let list = hostElement.querySelector('ul.open-group-menu-list') as HTMLUListElement | null;
    expect(list).not.toBeNull();

    const firstItem = list!.querySelector('li') as HTMLLIElement;

    firstItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(groupMenuDirective.isOpen).toBe(false);

    list = hostElement.querySelector('ul.open-group-menu-list') as HTMLUListElement | null;
    expect(list).toBeNull();
  });

  it('should keep group menu open on child click when closeGroupMenuOnChildClick = false and closeEntireMenuOnChildClick = false', () => {
    const hostElement: HTMLElement = groupMenuDe.nativeElement;

    groupMenuDirective.closeGroupMenuOnChildClick = false;
    groupMenuDirective.closeEntireMenuOnChildClick = false;

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    let list = hostElement.querySelector('ul.open-group-menu-list') as HTMLUListElement | null;
    expect(list).not.toBeNull();

    const firstItem = list!.querySelector('li') as HTMLLIElement;

    firstItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(groupMenuDirective.isOpen).toBe(true);
    list = hostElement.querySelector('ul.open-group-menu-list') as HTMLUListElement | null;
    expect(list).not.toBeNull();
  });

  it('should keep menu open when closeGroupMenuOnChildClick = false', () => {
    const hostElement: HTMLElement = groupMenuDe.nativeElement;

    groupMenuDirective.closeGroupMenuOnChildClick = false;

    groupMenuDe.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    let list = hostElement.querySelector('ul.open-group-menu-list') as HTMLUListElement | null;
    expect(list !== null).toBe(true);

    const firstItem = list!.querySelector('li') as HTMLLIElement;
    firstItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(groupMenuDirective.isOpen).toBe(true);
    list = hostElement.querySelector('ul.open-group-menu-list') as HTMLUListElement | null;
    expect(list !== null).toBe(true);
  });
});
