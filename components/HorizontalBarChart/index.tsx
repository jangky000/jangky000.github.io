import { useTheme } from '@emotion/react';
import * as d3 from 'd3';
import {
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

export interface BarChartDatum {
  label: string;
  value: number;
  ratio: number;
}

export interface HorizontalBarChartProps {
  barChartData?: BarChartDatum[];
  color?: 'primary' | 'secondary';
}

const colors = [
  '#4dbfd3',
  '#70d4e4',
  '#1c8ca4',
  '#5793a1',
  '#b5cacc',
  '#305e68',
];

const tooltipBorder = '#dddddd';

export const mockData: BarChartDatum[] = [
  {
    label: '20세 이하',
    value: 1230,
    ratio: 10,
  },
  {
    label: '21 ~25세',
    value: 2453,
    ratio: 20,
  },
  {
    label: '26 ~30세',
    value: 3643,
    ratio: 30,
  },
  {
    label: '31 ~35세',
    value: 4345,
    ratio: 40,
  },
  {
    label: '36 ~40세',
    value: 3235,
    ratio: 30,
  },
  {
    label: '41 ~45세',
    value: 2653,
    ratio: 20,
  },
  {
    label: '46 ~50세',
    value: 1546,
    ratio: 10,
  },
  {
    label: '51 ~55세',
    value: 534,
    ratio: 5,
  },
  {
    label: '56 ~60세',
    value: 365,
    ratio: 3,
  },
  {
    label: '61 ~65세',
    value: 223,
    ratio: 2,
  },
  {
    label: '66 ~70세',
    value: 143,
    ratio: 1,
  },
  {
    label: '71 ~75세',
    value: 53,
    ratio: 0.5,
  },
  {
    label: '76 ~80세',
    value: 32,
    ratio: 0.3,
  },
  {
    label: '81세 이상',
    value: 11,
    ratio: 0.1,
  },
];

function HorizontalBarChart({
  barChartData = mockData,
  color = 'primary',
}: HorizontalBarChartProps): ReactElement {
  const divRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // svg config
  const svgHeight = 346;
  const svgPadding = 20;
  const svgPaddingLeft = 70;

  // rect config
  const cloneData = useMemo(() => [...barChartData].reverse(), [barChartData]);
  const rectGap = 4;
  const rectHeight = useMemo(
    () =>
      barChartData.length && (svgHeight - svgPadding * 2) / barChartData.length,
    [barChartData],
  );
  const rectDx = 1; // grid와 겹치지 않게 조정

  const nFormatter = useCallback(
    (num: d3.NumberValue, digits: number): string => {
      if (!num) return num.toString();
      const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      const dataItem = lookup
        .slice()
        .reverse()
        .find(item => {
          return num >= item.value;
        });
      if (dataItem?.value)
        return (
          ((num as number) / dataItem.value).toFixed(digits).replace(rx, '$1') +
          dataItem.symbol
        );
      return num.toString();
    },
    [],
  );

  const clearChart = useCallback(() => {
    const divElement = d3.select(divRef.current);
    divElement.selectAll('svg').remove();
    divElement.selectAll('.d3-tip').remove();
  }, [divRef]);

  // get wrapper width for responsive chart
  const getDivWrapperWidth = useCallback(() => {
    return divRef?.current?.clientWidth || 0;
  }, [divRef]);

  const addSVG = useCallback(
    (wrapperWidth: number) => {
      const divElement = d3.select(divRef.current);
      return divElement
        .append('svg')
        .attr('width', wrapperWidth)
        .attr('height', svgHeight);
    },
    [divRef],
  );

  const getXScale = useCallback(
    (chartWidth: number) => {
      const maxDomain = d3.max(cloneData.map(data => data.value)) || 0;
      const xScale = d3
        .scaleLinear()
        .domain([0, maxDomain]) // 참조값 범위
        .range([0, chartWidth]) // 반환값  범위
        .nice();

      return xScale;
    },
    [cloneData],
  );

  const addXAxis = useCallback(
    (
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
      xScale: d3.ScaleLinear<number, number, never>,
    ) => {
      const xAxis = d3.axisBottom(xScale).tickFormat(d => {
        return nFormatter(d, 2);
      });

      svg
        .append('g')
        .attr('class', 'x-axis')
        .attr(
          'transform',
          `translate(${svgPaddingLeft}, ${svgHeight - svgPadding})`,
        )
        .call(xAxis);

      return xScale;
    },
    [],
  );

  const addXGrid = useCallback(
    (height: number) => {
      d3.selectAll('g.x-axis g.tick')
        .append('line')
        .attr('class', 'gridline')
        .attr('x1', 0)
        .attr('y1', -height)
        .attr('x2', 0)
        .attr('y2', 0)
        .attr('stroke', () => tooltipBorder);
    },
    [theme],
  );

  const addYAxis = useCallback(
    (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
      // get y scale
      const yDomain = cloneData.map(data => data.label);
      const yScale = d3.scaleBand(yDomain, [0, svgHeight - svgPadding * 2]);

      // add Y axis
      const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

      svg
        .append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${svgPaddingLeft}, ${svgPadding})`)
        .call(yAxis);
    },
    [cloneData],
  );

  const addYGrid = useCallback((width: number) => {
    d3.selectAll('g.y-axis g.tick')
      .append('line')
      .attr('class', 'gridline')
      .attr('x1', 0)
      .attr('y1', -rectHeight / 2)
      .attr('x2', width)
      .attr('y2', -rectHeight / 2)
      .attr('stroke', () => tooltipBorder);
  }, []);

  const addRect = useCallback(
    (
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
      xScale: d3.ScaleLinear<number, number, never>,
    ) => {
      svg
        .append('g')
        .attr('class', 'rect-group')
        .selectAll('rect')
        .data(cloneData)
        .join('rect')
        .attr('width', data => xScale(data.value))
        .attr('height', () => rectHeight - rectGap)
        .attr('x', () => svgPaddingLeft + rectDx)
        .attr('y', (_, index) => svgPadding + rectHeight * index)
        .attr('fill', () => (color === 'secondary' ? '#41BDD8' : colors[0]))
        .on(
          'mouseenter',
          (event: MouseEvent<HTMLElement>, d: BarChartDatum) => {
            // hover
            d3.select(event.currentTarget)
              .style('fill', color === 'secondary' ? '#3AAAC2' : colors[1])
              .style('cursor', 'pointer');
            // show tooltip
            d3.select(divRef.current)
              .select('.d3-tip')
              .html(
                `${d.label}: ${(d.value || 0).toLocaleString()}명(${(
                  d.ratio || 0
                ).toFixed(1)}%)`,
              )
              .style('opacity', 0.9)
              .style('display', 'block')
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 28}px`);
          },
        )
        .on('mouseleave', (event: MouseEvent<HTMLElement>) => {
          // hover
          d3.select(event.currentTarget)
            .style('fill', color === 'secondary' ? '#41BDD8' : colors[0])
            .style('cursor', 'none');
          // hide tooltip
          d3.select(divRef.current)
            .select('.d3-tip')
            .style('opacity', 0)
            .style('display', 'none');
        });

      d3.selectAll('.value-as-label text');
    },
    [divRef, cloneData, theme],
  );

  const addRectValueAsLabel = useCallback(
    (
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
      xScale: d3.ScaleLinear<number, number, never>,
      chartWidth: number,
    ) => {
      // add value as bar label
      svg
        .append('g')
        .attr('class', 'value-as-label')
        .selectAll('text')
        .data(cloneData)
        .join('text')
        .attr('x', () => svgPaddingLeft + rectDx)
        .attr('y', (_, index) => svgPadding + rectHeight * index)
        .attr('dy', '1.3em')
        .attr('dx', data => xScale(data.value))
        .attr('font-size', 10)
        .attr('text-anchor', 'start') // default
        .html(
          data =>
            `${data.value?.toLocaleString() || 0}명(${
              data.ratio?.toFixed(1) || 0
            }%)`,
        );

      // switching label text-anchor position
      const nodes = svg
        .selectAll('.value-as-label text')
        .nodes() as SVGTextElement[];
      const textWidthArray = nodes.map(
        node => node.getBoundingClientRect().width,
      );
      svg
        .selectAll('.value-as-label text')
        .attr('text-anchor', (data: any, index) => {
          const barLength = xScale(data.value);
          const textLength = textWidthArray[index];
          const isOverflow = barLength + textLength > chartWidth;
          const position = isOverflow ? 'end' : 'start';
          return position;
        });
    },
    [divRef, cloneData, theme],
  );

  const addToolTip = useCallback(() => {
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
  }, [divRef, theme]);

  // draw
  const drawLineChart = useCallback(() => {
    clearChart();
    const wrapperWidth = getDivWrapperWidth();
    const svg = addSVG(wrapperWidth);
    addToolTip();
    const chartWidth = wrapperWidth - svgPadding - svgPaddingLeft;
    const xScale = getXScale(chartWidth);
    addXAxis(svg, xScale);
    addXGrid(svgHeight - svgPadding * 2);
    addYAxis(svg);
    addYGrid(chartWidth);
    addRect(svg, xScale);
    addRectValueAsLabel(svg, xScale, chartWidth);
  }, [
    clearChart,
    getDivWrapperWidth,
    addSVG,
    addToolTip,
    getXScale,
    addXAxis,
    addXGrid,
    addYAxis,
    addYGrid,
    addRect,
  ]);

  useEffect(() => {
    drawLineChart();
    // reponsive
    window.addEventListener('resize', drawLineChart);
    return () => {
      window.removeEventListener('resize', drawLineChart);
    };
  }, [barChartData]);

  return (
    <div ref={divRef} style={{ width: '100%', aspectRatio: '2 / 1' }}>
      <div className="d3-tip" />
    </div>
  );
}

export default HorizontalBarChart;
