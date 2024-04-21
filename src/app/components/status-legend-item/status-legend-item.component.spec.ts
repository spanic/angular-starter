import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Status } from 'src/app/models/statuses-data.model';
import { StatusLegendItemComponent } from './status-legend-item.component';

describe('StatusLegendItemComponent', () => {
  let component: StatusLegendItemComponent;
  let fixture: ComponentFixture<StatusLegendItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [StatusLegendItemComponent],
    });
    fixture = TestBed.createComponent(StatusLegendItemComponent);
    component = fixture.componentInstance;
    component.status = Status.Operational;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
