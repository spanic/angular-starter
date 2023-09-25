import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GaugeData, GaugeDataEntry } from './dashboard.component.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // TODO: replace with actual width and height
  private width = 400;
  private height = 300;

  private radius = Math.min(this.width, this.height) / 2;

  // TODO: pass data as an input parameter
  private data: GaugeData = [
    {
      status: 'Operational',
      color: 'green',
      ids: [
        '59e5b650-eec5-4ef4-a906-ca6cb818a940',
        '327d84bf-093f-44c7-b48c-75e7de97cec4',
        '5e6a73ba-02dd-408a-9f4f-7b79ae06e2fe',
      ],
    },
    {
      status: 'Warning',
      color: 'orange',
      ids: ['c12d1c7e-31fd-4ff8-b2a9-1a0fdb24cf0c'],
    },
    {
      status: 'Failure',
      color: 'red',
      ids: [
        'fb876f64-e3fd-40f5-8afa-4152ee0ff9f2',
        '2a9f8e07-ef41-4e9f-b60c-3e6f5094e6c5',
        '5e9bbd05-91f2-450e-9d12-419946dfe728',
        'b0309ac8-3387-4aec-a8b1-f55f1d10e837',
      ],
    },
  ];

  private svg;

  ngOnInit(): void {
    const arc = d3
      .arc<d3.PieArcDatum<GaugeDataEntry>>()
      .innerRadius(this.radius * 0.67)
      .outerRadius(this.radius - 1);

    const pie = d3
      .pie<GaugeDataEntry>()
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .padAngle(1 / this.radius)
      .sort(null)
      .value((d) => d.ids.length || 0);

    const svg = d3
      .select('figure#gauge_graph')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', [
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height / 2,
      ])
      .attr('style', 'max-width: 100%; height: auto;');

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

    const legend = d3
      .select('figure#gauge_legend')
      .append('svg')
      .attr('width', this.width)
      .attr('height', '100px')
      .attr('style', 'max-width: 100%; height: auto;')
      .attr('viewBox', [0, 0, this.width, 100]);

    const legendGroups = legend
      .selectAll()
      .data(this.data)
      .join('g')
      .attr('transform', (d, i) => {
        return `translate(0, ${20 * i + 10 * i})`;
      });

    legendGroups
      .append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .style('fill', (d: GaugeDataEntry) => d.color);

    legendGroups
      .append('text')
      .text((d) => d.status)
      .attr('x', 20 + 10)
      .attr('y', 17);
  }
}
