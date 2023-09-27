import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GaugeData } from '../dashboard/dashboard.component.types';

/**
 * Base gauge graph parameters
 */
const GAUGE_WIDTH_PX = 400;
const GAUGE_HEIGHT_PX = 200;
const GAUGE_ARC_RADIUS_PX = Math.min(GAUGE_WIDTH_PX, GAUGE_HEIGHT_PX) / 2;

/**
 * Base Legend parameters
 */
const LEGEND_WIDTH_PX = 400;
const LEGEND_SQUARE_SIZE_PX = 20;
const LEGEND_SQUARE_OFFSET_PX = 10;

@Component({
  selector: 'app-gauge-status',
  templateUrl: './gauge-status.component.html',
  styleUrls: ['./gauge-status.component.scss'],
})
export class GaugeStatusComponent implements OnInit {
  @Input()
  data: GaugeData[];

  ngOnInit(): void {
    this.drawGauge();
    this.drawLegend();
  }

  private drawGauge(): void {
    const arc = d3
      .arc<d3.PieArcDatum<GaugeData>>()
      .innerRadius(GAUGE_ARC_RADIUS_PX * 0.67)
      .outerRadius(GAUGE_ARC_RADIUS_PX - 1);

    const pie = d3
      .pie<GaugeData>()
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .padAngle(1 / GAUGE_ARC_RADIUS_PX)
      .sort(null)
      .value((d) => d.ids.length || 0);

    const svg = d3
      .select('figure#gauge_graph')
      .append('svg')
      .attr('width', GAUGE_WIDTH_PX)
      .attr('height', GAUGE_HEIGHT_PX)
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

    svg
      .append('g')
      .selectAll()
      .data(pie(this.data))
      .join('path')
      .style('cursor', 'pointer')
      .attr('fill', (d) => d.data.color)
      .attr('d', arc);

    svg
      .selectAll('path')
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
      });
  }

  private drawLegend(): void {
    const legendHeight =
      this.data.length * (LEGEND_SQUARE_SIZE_PX + LEGEND_SQUARE_OFFSET_PX) -
      LEGEND_SQUARE_OFFSET_PX;

    const legend = d3
      .select('figure#gauge_legend')
      .append('svg')
      .attr('height', `${legendHeight}px`)
      .attr('viewBox', [0, 0, LEGEND_WIDTH_PX, legendHeight])
      .attr('style', 'max-width: 100%; height: auto;');

    const legendGroups = legend
      .selectAll()
      .data(this.data)
      .join('g')
      .attr('transform', (d, i) => {
        return `translate(0, ${
          (LEGEND_SQUARE_SIZE_PX + LEGEND_SQUARE_OFFSET_PX) * i
        })`;
      })
      .attr('dominant-baseline', 'central');

    legendGroups
      .append('rect')
      .attr('width', LEGEND_SQUARE_SIZE_PX)
      .attr('height', LEGEND_SQUARE_SIZE_PX)
      .style('fill', (d: GaugeData) => d.color);

    legendGroups
      .append('text')
      .text((d) => d.status)
      .attr('x', LEGEND_SQUARE_SIZE_PX + LEGEND_SQUARE_OFFSET_PX)
      .attr('dy', LEGEND_SQUARE_SIZE_PX / 2);
  }
}
