import { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

import { TBarGraphProps } from "../types";

import "chart.js/auto";

const BarGraph = (props: TBarGraphProps) => {
  const { label, x, y, yAxisLabel = "" } = props;
  const backgroundColor = [
    "rgba(255, 0, 0, 0.2)",
    "rgba(255, 127, 0, 0.2)",
    "rgba(150, 150, 0, 0.2)",
    "rgba(0, 255, 0, 0.2)",
    "rgba(0, 0, 255, 0.2)",
    "rgba(75, 0, 130, 0.2)",
    "rgba(148, 0, 211, 0.2)"
  ];
  const borderColor = [
    "rgba(255, 0, 0, 1)",
    "rgba(255, 127, 0, 1)",
    "rgba(200, 200, 0, 1)",
    "rgba(0, 255, 0, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(75, 0, 130, 1)",
    "rgba(148, 0, 21, 11)"
  ];
  const data: ChartData<"bar"> = {
    labels: x,
    datasets: [
      {
        label,
        data: y,
        backgroundColor,
        borderColor,
        borderWidth: 1
      }
    ]
  };
  const options: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
            weight: "400"
          }
        }
      },
      y: {
        suggestedMax: 5,
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            size: 16,
            weight: "600"
          }
        },
        ticks: {
          stepSize: 1,
          font: {
            size: 14,
            weight: "400"
          }
        }
      }
    }
  };

  return <Bar className="mb-5" data={data} options={options} />;
};

export default BarGraph;
