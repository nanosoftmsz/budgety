import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Jan 2020", "Feb 2020", "Mar 2020", "Apr 2020", "May 2020", "Jun 2020", "Jul 2020", "Aug 2020", "Sep 2020", "Oct 2020", "Nov 2020", "Dec 2020"],
  datasets: [
    {
      label: "Earned Money",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "#2979ff",
    },
    {
      label: "Expense",
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: "#e91e63",
    },
    {
      label: "Save",
      data: [3, 10, 13, 15, 22, 30],
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

const GroupBarChart = () => <Bar data={data} options={options} />;

export default GroupBarChart;
