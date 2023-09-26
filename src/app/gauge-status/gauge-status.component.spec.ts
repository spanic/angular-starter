import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeStatusComponent } from './gauge-status.component';

describe('GaugeStatusComponent', () => {
  let component: GaugeStatusComponent;
  let fixture: ComponentFixture<GaugeStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaugeStatusComponent],
    });
    fixture = TestBed.createComponent(GaugeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
