import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Seguidores',
      data: [120, 190, 300, 500, 800],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: true, text: 'Crescimento nas redes sociais' },
  },
};

export default function ChartCard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
}
