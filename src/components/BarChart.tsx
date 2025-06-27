import React from 'react';
import { Bar } from 'react-chartjs-2';

export function BarChart() {
  const data = {
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    datasets: [
      {
        label: 'Engajamento (%)',
        data: [40, 55, 75, 60, 90],
        backgroundColor: '#f472b6',
      },
    ],
  };

  return <Bar data={data} />;
}