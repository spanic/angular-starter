import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import * as d3 from 'd3';
import { GaugeData } from './gauge-status.model';
import { StatusLegendItemComponent } from '../status-legend-item/status-legend-item.component';
import { Status } from 'src/app/models/statuses-data.model';

/**
 * Base gauge graph parameters
 */
const GAUGE_WIDTH_PX = 400;
const GAUGE_HEIGHT_PX = 200;
const GAUGE_ARC_RADIUS_PX = Math.min(GAUGE_WIDTH_PX, GAUGE_HEIGHT_PX) / 2;

@Component({
  selector: 'app-gauge-status',
  templateUrl: './gauge-status.component.html',
  styleUrls: ['./gauge-status.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GaugeStatusComponent implements AfterViewInit {
  @ViewChild('gaugeContainer')
  private _gaugeContainer: ElementRef;

  @ViewChild('legendContainer')
  private _legendContainerRef: ElementRef;

  @ViewChild('legendItemsContainer', { read: ViewContainerRef })
  private _legendItemsContainer: ViewContainerRef;

  private _data: GaugeData;

  @Input()
  set data(data: GaugeData) {
    this._data = data;
    this._updateGauge();
    this._drawLegend();
  }

  get data(): GaugeData {
    return this._data;
  }

  private _pieGenerator = d3
    .pie<[string, number]>()
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .padAngle(1 / GAUGE_ARC_RADIUS_PX)
    .sort(null)
    .value(([, qty]) => qty || 0);

  private _arcGenerator = d3
    .arc<d3.PieArcDatum<[string, number]>>()
    .innerRadius(GAUGE_ARC_RADIUS_PX * 0.67)
    .outerRadius(GAUGE_ARC_RADIUS_PX - 1);

  ngAfterViewInit(): void {
    this._drawGauge();
  }

  private _drawGauge(): void {
    d3.select<SVGSVGElement, d3.PieArcDatum<[string, number]>>(
      this._gaugeContainer.nativeElement
    )
      .append('svg')
      .attr('width', GAUGE_WIDTH_PX)
      .attr('viewBox', [
        -GAUGE_WIDTH_PX / 2,
        -GAUGE_HEIGHT_PX / 2 - GAUGE_ARC_RADIUS_PX / 2,
        GAUGE_WIDTH_PX,
        GAUGE_HEIGHT_PX,
      ])
      .attr(
        'style',
        'display: block; max-width: 100%; height: auto; margin: 0 auto;'
      );
  }

  private _updateGauge() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const prevAngleValues = d3.local<[number, number]>();

    const groups = d3
      .select<SVGSVGElement, d3.PieArcDatum<[string, number]>>(
        this._gaugeContainer.nativeElement
      )
      .selectChild('svg')
      .selectAll('g');

    if (!groups.empty()) {
      groups.each(function () {
        const path = d3.select(this).select<SVGPathElement>('path');
        const { startAngle, endAngle } = path.datum() as d3.PieArcDatum<
          [string, number]
        >;
        prevAngleValues.set(path.node(), [startAngle, endAngle]);
      });
    }

    const updatedGroups = groups.data(
      this._pieGenerator(Object.entries(this.data)),
      function (datum: d3.PieArcDatum<[string, number]>) {
        return datum.data[0];
      }
    );

    updatedGroups
      .enter()
      .append('g')
      .style('cursor', 'pointer')
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(150)
          .ease(d3.easeLinear)
          .attr('transform', 'scale(1.05)');
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(150)
          .ease(d3.easeLinear)
          .attr('transform', 'scale(1)');
      })
      .append('path')
      .attr('class', ({ data: [status] }) => {
        return `_${status.toLowerCase()}_background-fill`;
      })
      .transition()
      .duration(500)
      .attrTween('d', function (datum) {
        const interpolate = d3.interpolate(datum.startAngle, datum.endAngle);
        return function (t) {
          datum.endAngle = interpolate(t);
          return self._arcGenerator(datum);
        };
      });

    updatedGroups
      .select<SVGPathElement>('path')
      .transition()
      .duration(500)
      .attrTween('d', function (datum) {
        const [prevStartAngle, prevEndAngle] = prevAngleValues.get(this);
        const startAngleInterpolation = d3.interpolate(
          prevStartAngle,
          datum.startAngle
        );
        const endAngleInterpolation = d3.interpolate(
          prevEndAngle,
          datum.endAngle
        );
        return function (t) {
          datum.startAngle = startAngleInterpolation(t);
          datum.endAngle = endAngleInterpolation(t);
          return self._arcGenerator(datum);
        };
      });

    updatedGroups
      .exit()
      .transition()
      .duration(500)
      .remove()
      .select<SVGPathElement>('path')
      .attrTween('d', function (datum: d3.PieArcDatum<[string, number]>) {
        const interpolate = d3.interpolate(datum.startAngle, datum.endAngle);
        return function (t) {
          datum.startAngle = interpolate(t);
          return self._arcGenerator(datum);
        };
      });
  }

  private _drawLegend(): void {
    d3.select(this._legendContainerRef.nativeElement)
      .selectChildren()
      ?.remove();

    d3.select(this._legendContainerRef.nativeElement)
      .selectAll()
      .data(Object.entries(this.data))
      .enter()
      .each(([status]) => {
        const componentRef = this._legendItemsContainer.createComponent(
          StatusLegendItemComponent
        );
        componentRef.instance.status = status as Status;
      });
  }
}
