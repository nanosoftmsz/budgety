import React from "react";
import { Line } from "react-chartjs-2";

export default function MonthlySavedLineChart({ monthlySavedLineChart }) {
  let name = [],
    saved = [];

  monthlySavedLineChart?.map((el) => name.push(el.name));
  monthlySavedLineChart?.map((el) => saved.push(el.saved));

  const data = {
    labels: name,
    datasets: [
      {
        label: "Amount",
        data: saved,
        fill: false,
        backgroundColor: "#2e7d32",
        borderColor: "#c8e6c9",
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
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
