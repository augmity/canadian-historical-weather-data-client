import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
// import { legend } from "@d3/color-legend"



/*
 * CalendarChart
 */
export const CalendarChart = ({ data, dataType }) => {

  const d3Container = useRef(null);
  

  useEffect(() => {
    const parseTime = d3.timeParse("%Y-%m-%d");
    const chartData = data.map(item => {
      return {
        date: parseTime(item.dateTime),
        value: (dataType === 'rain') ? item.totalRain : item.meanTemp
      }
    });

    const weekday = 'monday';
    const cellSize = 17;
    const width = 954;
    const height = cellSize * (weekday === "weekday" ? 7 : 9);

    const countDay = (weekday === "sunday") ? d => d.getUTCDay() : d => (d.getUTCDay() + 6) % 7;
    const timeWeek = (weekday === "sunday") ? d3.utcSunday : d3.utcMonday;

    const max = Math.max(...chartData.map(d => d.value));
    const min = Math.min(...chartData.map(d => d.value));
    const color = (dataType === 'rain') 
      ? d3.scaleSequential(d3.interpolateBlues).domain([0, max])
      : d3.scaleSequential(d3.interpolateRgb('#209cee', '#ffdd57')).domain([min, max]);

    const formatDay = d => "SMTWTFS"[d.getUTCDay()];
    const formatMonth = d3.utcFormat("%b");
    const formatDate = d3.utcFormat("%d-%m-%Y");
    const format = d3.format(".2");

    const pathMonth = (t) => {
      const n = weekday === "weekday" ? 5 : 7;
      const d = Math.max(0, Math.min(n, countDay(t)));
      const w = timeWeek.count(d3.utcYear(t), t);
      return `${d === 0 ? `M${w * cellSize},0`
          : d === n ? `M${(w + 1) * cellSize},0`
          : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${n * cellSize}`;
    }

    const years = d3.nest()
        .key(d => d.date.getUTCFullYear())
      .entries(chartData)
      .reverse();

    const svg = d3.select(d3Container.current)
        .attr("viewBox", [0, 0, width, height * years.length])
        .attr("width", width)
        .attr("height", height * years.length)
        .attr("font-family", "sans-serif")
        .attr("font-size", 10);

    const year = svg.selectAll("g")
      .data(years)
      .join("g")
        .attr("transform", (d, i) => `translate(40,${height * i + cellSize * 1.5})`);

    year.append("text")
        .attr("x", -5)
        .attr("y", -5)
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(d => d.key);

    year.append("g")
        .attr("text-anchor", "end")
      .selectAll("text")
      .data((weekday === "weekday" ? d3.range(2, 7) : d3.range(7)).map(i => new Date(1995, 0, i)))
      .join("text")
        .attr("x", -5)
        .attr("y", d => (countDay(d) + 0.5) * cellSize)
        .attr("dy", "0.31em")
        .text(formatDay);

    year.append("g")
      .selectAll("rect")
      .data(d => d.values)
      .join("rect")
        .attr("width", cellSize - 1)
        .attr("height", cellSize - 1)
        .attr("x", d => timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5)
        .attr("y", d => countDay(d.date) * cellSize + 0.5)
        .attr("fill", d => color(d.value))
      .append("title")
        .text(d => `${format(d.value)} (${formatDate(d.date)})`);

    const month = year.append("g")
      .selectAll("g")
      .data(d => d3.utcMonths(d3.utcMonth(d.values[0].date), d.values[d.values.length - 1].date))
      .join("g");

    month.filter((d, i) => i).append("path")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("d", pathMonth);

    month.append("text")
        .attr("x", d => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2)
        .attr("y", -5)
        .text(formatMonth);
  }, [data]);

  return <svg
    className="d3-component"
    ref={d3Container}
  />;
}
