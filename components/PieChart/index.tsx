import { MouseEvent, ReactElement, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';

interface Data {
  label: string;
  value: number;
}

const mockData: Data[] = [
  {
    label: '1개',
    value: 1230,
  },
  {
    label: '2개',
    value: 2453,
  },
  {
    label: '3개',
    value: 3643,
  },
  {
    label: '4개',
    value: 4345,
  },
  {
    label: '5개 이상',
    value: 3235,
  },
];

const colors = [
  '#4dbfd3',
  '#70d4e4',
  '#1c8ca4',
  '#5793a1',
  '#b5cacc',
  '#305e68',
];

const tooltipBorder = '#dddddd';

function PieChart(): ReactElement {
  const divRef = useRef<HTMLDivElement>(null);

  // config
  // radius의 배율
  const pieK = 0.8;
  const labelK = 0.9;

  // clear
  const clearChart = () => {
    const divElement = d3.select(divRef.current);
    divElement.selectAll('svg').remove();
    divElement.selectAll('.d3-tip').remove();
  };

  // get wrapper width for responsive chart
  const getDivWrapperWidth = () => {
    return divRef?.current?.clientWidth || 0;
  };

  const addSVG = (svgWidth: number, svgHeight: number) => {
    const divElement = d3.select(divRef.current);
    return divElement
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);
  };

  // tooltip
  const addToolTip = () => {
    d3.select(divRef.current)
      .append('div')
      .attr('class', 'd3-tip')
      .style('opacity', 0)
      .style('display', 'none')
      .style('position', 'absolute')
      .style('padding', '12px')
      .style('border-radius', '2px')
      .style('border', `1px solid ${tooltipBorder}`)
      .style('background-color', '#fff');
  };

  // data
  const getPieData = () => {
    const pieGenerator = d3
      .pie<Data>()
      .value(d => d.value)
      .sort(null);

    const data = pieGenerator(mockData);
    return data;
  };

  // piechart
  const addPieChart = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    svgWidth: number,
    svgHeight: number,
    radius: number,
    data: d3.PieArcDatum<Data>[],
  ) => {
    const sliceGroup = svg
      .append('g')
      .attr('class', 'slices')
      .attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`);

    const arcGenerator = d3
      .arc<PieArcDatum<Data>>()
      .innerRadius(0)
      .outerRadius(radius * pieK);

    const color = colors.slice(0, 4);

    sliceGroup
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', d => color[d.index])
      .attr('stroke', '#fff')
      .style('stroke-width', '2px')
      .on(
        'mouseenter',
        (event: MouseEvent<HTMLElement>, d: d3.PieArcDatum<Data>) => {
          d3.select(event.currentTarget)
            .style('opacity', 0.5)
            .style('cursor', 'pointer');
          d3.select(divRef.current)
            .select('.d3-tip')
            .html(
              `<div style="text-align:center;">${
                d.data.label
              }<br/>${d.data.value.toLocaleString()}명(%)</div>`,
            )
            .style('opacity', 0.9)
            .style('display', 'block')
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`);
        },
      )
      .on('mouseout', (event: MouseEvent<HTMLElement>) => {
        d3.select(event.currentTarget)
          .style('opacity', 1)
          .style('cursor', 'none');
        d3.select(divRef.current)
          .select('.d3-tip')
          .style('opacity', '0')
          .style('display', 'none');
      });
  };

  const midAngle = (d: d3.PieArcDatum<Data>) => {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  };

  // label text
  const addLabel = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    svgWidth: number,
    svgHeight: number,
    radius: number,
    data: d3.PieArcDatum<Data>[],
  ) => {
    const labelGroup = svg
      .append('g')
      .attr('class', 'labels')
      .attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`);

    const labelArcGenerator = d3
      .arc<PieArcDatum<Data>>()
      .innerRadius(radius * labelK)
      .outerRadius(radius * labelK);

    labelGroup
      .selectAll('path')
      .data(data)
      .join('text')
      .attr('dy', '0.4em')
      .text(d => d.data.label)
      .attr('transform', d => {
        const pos = labelArcGenerator.centroid(d);
        // edit x
        pos[0] += 10 * (midAngle(d) < Math.PI ? 1 : -1);

        return `translate(${pos})`;
      })
      .style('text-anchor', d => (midAngle(d) < Math.PI ? 'start' : 'end'))
      .style('font-size', 10);
  };

  // polyline
  const addPolyLine = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    svgWidth: number,
    svgHeight: number,
    radius: number,
    data: d3.PieArcDatum<Data>[],
  ) => {
    const lineGroup = svg
      .append('g')
      .attr('class', 'lines')
      .attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`);

    const lineArcGenerator = d3
      .arc<PieArcDatum<Data>>()
      .innerRadius(radius * pieK)
      .outerRadius(radius * pieK);

    const labelArcGenerator = d3
      .arc<PieArcDatum<Data>>()
      .innerRadius(radius * labelK)
      .outerRadius(radius * labelK);

    lineGroup
      .selectAll('polyline')
      .data(data)
      .join('polyline')
      .attr('points', d => {
        const startPoint = lineArcGenerator.centroid(d);
        const middlePoint = labelArcGenerator.centroid(d);
        const endPoint = [...middlePoint];
        endPoint[0] += 10 * (midAngle(d) < Math.PI ? 1 : -1);
        return [startPoint, middlePoint, endPoint].join(' ');
      })
      .attr('stroke', '#000')
      .attr('fill', 'none');
    lineGroup.exit().remove();
  };

  // draw
  const drawLineChart = () => {
    clearChart();
    const wrapperWidth = getDivWrapperWidth();

    // svg config
    const svgWidth = wrapperWidth;
    const svgHeight = wrapperWidth / 2;

    // group config
    const radius = wrapperWidth / 4;

    const svg = addSVG(svgWidth, svgHeight);
    const data = getPieData();
    addPieChart(svg, svgWidth, svgHeight, radius, data);
    addLabel(svg, svgWidth, svgHeight, radius, data);
    addPolyLine(svg, svgWidth, svgHeight, radius, data);
    addToolTip();
  };

  // init
  useEffect(() => {
    drawLineChart();

    // reponsive
    window.addEventListener('resize', drawLineChart);
    return () => window.removeEventListener('resize', drawLineChart);
  }, []);

  return <div ref={divRef} style={{ width: '500px', height: '300px' }} />;
}

export default PieChart;
