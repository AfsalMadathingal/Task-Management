import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatisticsChart = ({ statistics }) => {
    const data = {
        labels: ['Active Tasks', 'Completed Tasks', 'Deleted Tasks'],
        datasets: [
            {
                label: '# of Tasks',
                data: [
                    statistics.activeTasks,
                    statistics.completedTasks,
                    statistics.deletedTasks,
                ],
                backgroundColor: ['#36A2EB', '#4CAF50', '#FF6384'],
                borderColor: ['#36A2EB', '#4CAF50', '#FF6384'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default TaskStatisticsChart;
