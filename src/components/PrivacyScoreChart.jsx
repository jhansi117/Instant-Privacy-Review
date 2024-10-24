import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PrivacyScoreChart = ({ scores }) => {
  const data = {
    labels: ['Data Collection', 'Data Usage', 'User Rights', 'Data Protection', 'Transparency'],
    datasets: [
      {
        label: 'Privacy Scores',
        data: scores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default PrivacyScoreChart;
