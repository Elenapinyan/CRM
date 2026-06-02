import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsOpenMenuTitleTestComponent } from './open-menu-title-test.component';
import { TemplateRef } from '@angular/core';

describe('DsOpenMenuTitleDirective', () => {
  let fixture: ComponentFixture<DsOpenMenuTitleTestComponent>;
  let component: DsOpenMenuTitleTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsOpenMenuTitleTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsOpenMenuTitleTestComponent);
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
