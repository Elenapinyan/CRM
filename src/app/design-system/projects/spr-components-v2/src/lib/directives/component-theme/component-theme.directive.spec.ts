import { Component, ElementRef, signal } from '@angular/core';
import { COMPONENT_THEME_HOST_DIRECTIVE } from './component-theme.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentThemeType } from './component-theme.options';

@Component({
  selector: 'ds-component-b',
  template: ``,
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
})
class ComponentB {}

@Component({
  selector: 'ds-component-a',
  template: `<ds-component-b [themeType]="themeType()" />`,
  imports: [ComponentB],
})
class ComponentA {
  themeType = signal<ComponentThemeType>(null);
}

describe('ComponentThemeDirective', () => {
  let fixture: ComponentFixture<ComponentA>;
  let component: ComponentA;
  let host: ElementRef;

  let attr = 'app-theme';

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ComponentA],
    }).createComponent(ComponentA);

    fixture = TestBed.createComponent(ComponentA);
    component = fixture.componentInstance;
    host = fixture.componentRef.injector.get(ElementRef);

    fixture.detectChanges();
  });
  it('Check [app-theme] attribute', () => {
    expect(host.nativeElement.getAttribute(attr)).toBeFalsy();
    const htmlElement = fixture.componentRef.injector.get(ElementRef).nativeElement.querySelector('ds-component-b');

    component.themeType.set('dark');
    fixture.detectChanges();
    expect(htmlElement.getAttribute(attr)).toBe('dark');

    component.themeType.set('light');
    fixture.detectChanges();
    expect(htmlElement.getAttribute(attr)).toBe('light');

    component.themeType.set('alt');
    fixture.detectChanges();
    expect(htmlElement.getAttribute(attr)).toBe('alt');

    component.themeType.set('root');
    fixture.detectChanges();
    expect(htmlElement.getAttribute(attr)).toBe('root');
  });
});
