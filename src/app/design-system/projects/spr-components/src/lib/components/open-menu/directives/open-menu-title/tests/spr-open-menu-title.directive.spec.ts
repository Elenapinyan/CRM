import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprOpenMenuTitleTestComponent } from './spr-open-menu-title-test.component';
import { TemplateRef } from '@angular/core';

describe('SprOpenMenuTitleDirective', () => {
  let fixture: ComponentFixture<SprOpenMenuTitleTestComponent>;
  let component: SprOpenMenuTitleTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprOpenMenuTitleTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SprOpenMenuTitleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  it('should provide a valid TemplateRef', () => {
    expect(component.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
