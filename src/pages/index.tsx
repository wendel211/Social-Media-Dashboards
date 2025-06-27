import React from 'react';
import Head from 'next/head';
import { LineChart } from '../components/LineChart';
import { PieChart } from '../components/PieChart';
import { BarChart } from '../components/BarChart';

export default function Home() {
  return (
    <>
      <Head>
        <title>Social Media Dashboard</title>
      </Head>
      <main className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Social Media Dashboard</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Seguidores vs Curtidas</h2>
            <LineChart />
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Distribuição por Plataforma</h2>
            <PieChart />
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Engajamento Semanal</h2>
            <BarChart />
          </div>
        </div>
      </main>
    </>
  );
}
