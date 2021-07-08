import React from "react";
import { Line } from "react-chartjs-2";

export default function MonthlyEarnedLineChart({ monthlyEarnedLineChart }) {
  let monthName = [],
    earned = [];

  monthlyEarnedLineChart?.map((el) => monthName.push(el.name));
  monthlyEarnedLineChart?.map((el) => earned.push(el.earned));

  const data = {
    labels: monthName,
    datasets: [
      {
        label: "Amount",
        data: earned,
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
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
