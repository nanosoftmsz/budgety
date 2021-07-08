import React from "react";
import { Bar } from "react-chartjs-2";

export default function GroupBarChart({ barChartData }) {
  console.log(barChartData);
  let monthName = [],
    earned = [],
    expense = [],
    saved = [];

  barChartData?.map((el) => monthName.push(el.name));
  barChartData?.map((el) => earned.push(el.earned));
  barChartData?.map((el) => expense.push(el.expense));
  barChartData?.map((el) => saved.push(el.saved));

  const data = {
    labels: monthName,
    datasets: [
      {
        label: "Earned Money",
        data: earned,
        backgroundColor: "#2979ff",
      },
      {
        label: "Expense",
        data: expense,
        backgroundColor: "#e91e63",
      },
      {
        label: "Save",
        data: saved,
        backgroundColor: "#4caf50",
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
      <Bar data={data} options={options} />
    </div>
  );
}
