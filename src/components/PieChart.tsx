import React from 'react';
import { Pie } from 'react-chartjs-2';

export function PieChart() {
  const data = {
    labels: ['Instagram', 'Facebook', 'Twitter'],
    datasets: [
      {
        data: [300, 200, 150],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      },
    ],
  };

  return <Pie data={data} />;
}
