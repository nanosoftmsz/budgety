import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "Amount",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "#2979ff",
      borderColor: "#bbdefb",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = () => <Line data={data} options={options} />;

export default LineChart;
