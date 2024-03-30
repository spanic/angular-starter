import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLegendItemComponent } from './status-legend-item.component';
import { Status } from 'src/app/models/statuses-data.model';

describe('StatusLegendItemComponent', () => {
  let component: StatusLegendItemComponent;
  let fixture: ComponentFixture<StatusLegendItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
