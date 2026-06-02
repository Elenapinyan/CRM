import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { DsOpenMenuItemTestComponent } from './open-menu-item-test.component';

describe('DsOpenMenuItemDirective', () => {
  let fixture: ComponentFixture<DsOpenMenuItemTestComponent>;
  let component: DsOpenMenuItemTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsOpenMenuItemTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsOpenMenuItemTestComponent);
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
