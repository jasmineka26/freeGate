import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

interface ChartProps {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries;
  type: string;
  height: number;
}

const Chart: React.FC<ChartProps> = ({ options, series, type, height }) => {
  const chartRef = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.updateOptions(options);
      chartRef.current.updateSeries(series);
    } else {
      chartRef.current = new ApexCharts(document.getElementById("area-chart"), {
        ...options,
        series: [{ name: "New users", data: series }],
        type,
        height,
      });
      chartRef.current.render();
    }
  }, [options, series, type, height]);

  return <div id="area-chart" />;
};

export default Chart;
