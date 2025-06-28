import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { LineChart } from '../components/LineChart';
import { PieChart } from '../components/PieChart';
import { BarChart } from '../components/BarChart';
import DateRangePicker from '../components/DateRangePicker';
import { isWithinInterval, format } from 'date-fns';
import axios from 'axios';
import { useRouter } from 'next/router';

const mockData = [
  { date: '2025-06-01', platform: 'Instagram', views: 300, likes: 150, shares: 50 },
  { date: '2025-06-02', platform: 'Twitter', views: 310, likes: 155, shares: 52 },
  { date: '2025-06-03', platform: 'Facebook', views: 320, likes: 160, shares: 54 },
  { date: '2025-06-04', platform: 'Instagram', views: 330, likes: 170, shares: 60 },
  { date: '2025-06-05', platform: 'Twitter', views: 340, likes: 180, shares: 65 },
  { date: '2025-06-06', platform: 'Facebook', views: 350, likes: 190, shares: 70 },
  { date: '2025-06-07', platform: 'Instagram', views: 360, likes: 200, shares: 75 },
  { date: '2025-06-08', platform: 'Twitter', views: 370, likes: 210, shares: 80 },
  { date: '2025-06-09', platform: 'Facebook', views: 380, likes: 220, shares: 85 },
  { date: '2025-06-10', platform: 'Instagram', views: 390, likes: 230, shares: 90 },
  { date: '2025-06-11', platform: 'Twitter', views: 400, likes: 240, shares: 95 },
  { date: '2025-06-12', platform: 'Facebook', views: 410, likes: 250, shares: 100 },
  { date: '2025-06-13', platform: 'Instagram', views: 420, likes: 260, shares: 105 },
  { date: '2025-06-14', platform: 'Twitter', views: 430, likes: 270, shares: 110 },
  { date: '2025-06-15', platform: 'Facebook', views: 440, likes: 280, shares: 115 },
];

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/auth/me')
      .then(() => setAuthenticated(true))
      .catch(() => router.push('/login'));
  }, [router]);

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

  async function handleLogout() {
    await axios.get('/api/auth/logout');
    router.push('/login');
  }

  if (!authenticated) return null;

  return (
    <>
      <Head>
        <title>Social Media Dashboard</title>
      </Head>
      <main className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Social Media Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
            Sair
          </button>
        </div>

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
