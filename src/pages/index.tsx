import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { LineChart } from '../components/LineChart';
import { PieChart } from '../components/PieChart';
import { BarChart } from '../components/BarChart';
import DateRangePicker from '../components/DateRangePicker';
import { isWithinInterval, format } from 'date-fns';

const mockData = [
  { date: '2025-06-01', platform: 'Instagram', views: 300, likes: 150, shares: 50 },
  { date: '2025-06-02', platform: 'Twitter', views: 310, likes: 155, shares: 52 },
  { date: '2025-06-03', platform: 'Facebook', views: 320, likes: 160, shares: 54 },
  { date: '2025-06-04', platform: 'Instagram', views: 330, likes: 170, shares: 60 },
  // ...adicione mais dados conforme necessário
];

export default function Home() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return mockData;
    return mockData.filter((item) =>
      isWithinInterval(new Date(item.date), { start: startDate, end: endDate })
    );
  }, [startDate, endDate]);

  const lineLabels = filteredData.map((d) => format(new Date(d.date), 'dd/MM'));
  const lineData = filteredData.map((d) => d.views);

  const pieLabels = Object.keys(
    filteredData.reduce((acc, curr) => {
      acc[curr.platform] = (acc[curr.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );
  const pieData = pieLabels.map((label) =>
    filteredData.filter((d) => d.platform === label).length
  );

  const barLabels = lineLabels;
  const barData = filteredData.map((d) => d.likes + d.shares);

  return (
    <>
      <Head>
        <title>Social Media Dashboard</title>
      </Head>
      <main className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Social Media Dashboard
        </h1>

        {/* Filtro de datas */}
        <div className="max-w-xl mx-auto mb-8">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Visualizações por Dia
            </h2>
            <LineChart data={lineData} labels={lineLabels} />
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Distribuição por Plataforma
            </h2>
            <PieChart data={pieData} labels={pieLabels} />
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Engajamento (Curtidas + Compartilhamentos)
            </h2>
            <BarChart data={barData} labels={barLabels} />
          </div>
        </div>
      </main>
    </>
  );
}
