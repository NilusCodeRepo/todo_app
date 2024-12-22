import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function PerformanceChart({ tasks }) {
  // Filter tasks based on status
  const completedTasks = tasks.filter((task) => task.status === 'Completed');
  const pendingTasks = tasks.filter((task) => task.status === 'Pending');
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');

  // Group tasks by the day they were created
  const dailyCompletedTasks = [2, 4, 1, 3, completedTasks.length]; // Update with dynamic data
  const dailyPendingTasks = [1, 2, 1, 1, pendingTasks.length]; // Update with dynamic data
  const dailyInProgressTasks = [1, 3, 1, 2, inProgressTasks.length]; // Update with dynamic data

  const dailyPerformance = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: dailyCompletedTasks,
        fill: false,
        borderColor: 'green',
        tension: 0.1
      },
      {
        label: 'Pending Tasks',
        data: dailyPendingTasks,
        fill: false,
        borderColor: 'orange',
        tension: 0.1
      },
      {
        label: 'In Progress Tasks',
        data: dailyInProgressTasks,
        fill: false,
        borderColor: 'blue',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Your Performance</h3>
      <Line data={dailyPerformance} />
    </div>
  );
}
