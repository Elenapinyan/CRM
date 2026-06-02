import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { SprOpenMenuItemTestComponent } from './spr-open-menu-item-test.component';

describe('SprOpenMenuItemDirective', () => {
  let fixture: ComponentFixture<SprOpenMenuItemTestComponent>;
  let component: SprOpenMenuItemTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprOpenMenuItemTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SprOpenMenuItemTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input values correctly', () => {
    expect(component.directive.hasSubMenu()).toBe(true);
    expect(component.directive.hasTopSplitter()).toBe(true);
    expect(component.directive.hasBottomSplitter()).toBe(false);
    expect(component.directive.extraClasses()).toBe('custom-class');
    expect(component.directive.isDisabled()).toBe(true);
  });

  it('should have a valid TemplateRef', () => {
    expect(component.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
