import type ReactApexChart from 'react-apexcharts';

export function getChartConfig(categories: string[], data: number[]) {
  return {
    options: {
      chart: {
        toolbar: false,
        background: 'transparent',
        id: 'basic-bar',
      },
      xaxis: {
        categories: categories,
      },
      colors: ['#FFFFFF'],
      grid: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
    },
    series: [
      {
        name: 'Max temperature',
        data: data,
      },
    ],
    type: 'line',
    height: 200,
  } as unknown as ReactApexChart;
}
