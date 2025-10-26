// Dashboard.tsx

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface DashboardProps {
  studentsData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  jobsData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}

const Dashboard: React.FC<DashboardProps> = ({ studentsData, jobsData }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '45%' }}>
          <h2>Number of Students</h2>
          <Bar
            data={studentsData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <div style={{ width: '45%' }}>
          <h2>Number of Jobs</h2>
          <Line
            data={jobsData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;