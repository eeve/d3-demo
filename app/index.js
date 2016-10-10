// enter point
import * as d3 from 'd3';

console.log(`d3 version: ${d3.version}`);

import d1 from './d1.json';
console.log(d1);

let padding = { left: 20, top: 30, right: 50, bottom: 20 }
let frame = { width: 500, height: 300 }
let svg = d3.select('body')
	.append('svg')
	.attr('width', frame.width)
	.attr('height', frame.height);

let data = d1.data[0];

let xScale = d3.scaleBand()
	.domain(d3.range(data.length))
	.range([0, frame.width - padding.left - padding.right]);

let yScale = d3.scaleLinear()
	.domain([0, d3.max(data)])
	.range([frame.height - padding.top - padding.bottom, 0]);

let xAxis = d3.axisBottom(xScale);

let yAxis = d3.axisLeft(yScale);

let rectPadding = 10;

let rectWidth = 20;

// 添加矩形和文字元素
let rects = svg.selectAll('.MyRect')
	.data(data)
	.enter()
	.append('rect')
	.attr('class', "MyRect")
	.attr('transform', `translate(${padding.left}, ${padding.top})`)
	.attr('x', (d, i) => xScale(i) + xScale.step()/2 - rectWidth/2)
	.attr('y', (d, i) => yScale(d))
	.attr('width', rectWidth)
	.transition()
	.duration(650)
	.ease(d3.easeLinear)
	.attr('height', d => frame.height - yScale(d) - padding.bottom - padding.top)
	.attr('fill', 'steelblue')

xAxis = svg.append('g')
	.attr('class', 'axis')
	.attr('transform', `translate(${padding.left}, ${frame.height - padding.bottom})`)
	.call(xAxis);

yAxis = svg.append('g')
	.attr('class', 'axis')
	.attr('transform', `translate(${padding.left}, ${padding.top})`)
	.call(yAxis);

// 添加文字元素
svg.selectAll('.MyText')
.data(data)
.enter()
.append('text')
.attr('class', 'MyText')
.attr('transform', `translate(${padding.left}, ${padding.top})`)
.attr('x', (d, i) => xScale(i) + rectPadding / 2)
.attr('y', (d, i) => yScale(d))
.attr('dx', () => (xScale.step() - rectPadding) / 2)
.attr('dy', () => 20)
.text((d) => d);

// x轴label
svg.append('g')
.attr('transform', `translate(${frame.width - padding.right + 5}, ${frame.height - padding.bottom + 5})`)
.append('text')
.text('分类');

// y轴label
svg.append('g')
.attr('transform', `translate(0, ${padding.top - 10})`)
.append('text')
.text('数据');


