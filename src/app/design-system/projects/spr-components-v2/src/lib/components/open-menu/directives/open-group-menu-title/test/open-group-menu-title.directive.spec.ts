import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { DsOpenGroupMenuTitleTestComponent } from './open-group-menu-title-test.coomponent';

describe('DsOpenGroupMenuTitleDirective', () => {
  let fixture: ComponentFixture<DsOpenGroupMenuTitleTestComponent>;
  let component: DsOpenGroupMenuTitleTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsOpenGroupMenuTitleTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsOpenGroupMenuTitleTestComponent);
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
