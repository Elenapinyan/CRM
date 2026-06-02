import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { syncViewModel } from '../../shared/utils';
import { DsReadonlyControlComponent } from './readonly-control.component';

describe('SprReadonlyControlComponent', () => {
  let fixture: ComponentFixture<DsReadonlyControlComponent>;
  let component: DsReadonlyControlComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(DsReadonlyControlComponent);

    component = fixture.componentInstance;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
