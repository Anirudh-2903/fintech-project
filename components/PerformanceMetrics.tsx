// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import {Line} from "react-chartjs-2";

const PerformanceMetrics = () => {
    // Time period state for the chart
    const [timePeriod, setTimePeriod] = useState('1M')

    // Mock data for the chart
    const chartData = {
        labels: ['7 Feb', '12 Feb', '17 Feb', '22 Feb', '27 Feb', '4 Mar', '9 Mar'],
        datasets: [
            {
                label: 'Portfolio Value',
                data: [5300000, 5350000, 5280000, 5400000, 5450000, 5500000, 5750000],
                borderColor: '#0088FF',
                backgroundColor: 'rgba(0, 136, 255, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#0088FF',
                pointHoverBackgroundColor: '#0088FF',
                pointBorderWidth: 0,
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#555',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#888',
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
        },
        elements: {
            line: {
                borderWidth: 2,
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
    }
    return (
    <>
        <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Performance Summary</h2>
            <div className="bg-dark-100 rounded-xl p-4 w-fit">
                <div className="text-lg text-text-200 font-bold">₹5,50,000</div>
                <div className="flex items-center gap-1 text-sm mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12.6875C8.12488 12.6875 9.2245 12.3539 10.1598 11.729C11.0951 11.104 11.8241 10.2158 12.2546 9.17651C12.685 8.13726 12.7977 6.99369 12.5782 5.89042C12.3588 4.78716 11.8171 3.77374 11.0217 2.97833C10.2263 2.18292 9.21284 1.64124 8.10957 1.42178C7.00631 1.20233 5.86274 1.31496 4.82348 1.74543C3.78423 2.17591 2.89596 2.90489 2.27101 3.84019C1.64606 4.7755 1.3125 5.87512 1.3125 7C1.31409 8.50793 1.91382 9.95364 2.98009 11.0199C4.04635 12.0862 5.49207 12.6859 7 12.6875ZM7 2.1875C7.95182 2.1875 8.88227 2.46975 9.67368 2.99855C10.4651 3.52736 11.0819 4.27896 11.4462 5.15833C11.8104 6.0377 11.9057 7.00534 11.72 7.93887C11.5343 8.87241 11.076 9.72991 10.4029 10.403C9.72991 11.076 8.8724 11.5343 7.93887 11.72C7.00534 11.9057 6.0377 11.8104 5.15833 11.4462C4.27896 11.0819 3.52735 10.4651 2.99855 9.67368C2.46974 8.88227 2.1875 7.95182 2.1875 7C2.18894 5.72409 2.69644 4.50085 3.59864 3.59865C4.50085 2.69644 5.72409 2.18895 7 2.1875ZM4.94046 6.87203C4.89979 6.8314 4.86752 6.78315 4.8455 6.73004C4.82348 6.67692 4.81215 6.61999 4.81215 6.5625C4.81215 6.505 4.82348 6.44807 4.8455 6.39496C4.86752 6.34185 4.89979 6.2936 4.94046 6.25297L6.69047 4.50297C6.7311 4.46229 6.77935 4.43002 6.83246 4.408C6.88557 4.38599 6.9425 4.37465 7 4.37465C7.05749 4.37465 7.11442 4.38599 7.16753 4.408C7.22064 4.43002 7.2689 4.46229 7.30953 4.50297L9.05953 6.25297C9.14162 6.33506 9.18774 6.4464 9.18774 6.5625C9.18774 6.6786 9.14162 6.78994 9.05953 6.87203C8.97744 6.95412 8.86609 7.00024 8.75 7.00024C8.6339 7.00024 8.52256 6.95412 8.44047 6.87203L7.4375 5.86851L7.4375 9.1875C7.4375 9.30353 7.3914 9.41481 7.30936 9.49686C7.22731 9.57891 7.11603 9.625 7 9.625C6.88396 9.625 6.77268 9.57891 6.69064 9.49686C6.60859 9.41481 6.5625 9.30353 6.5625 9.1875L6.5625 5.86851L5.55953 6.87203C5.5189 6.91271 5.47064 6.94498 5.41753 6.96699C5.36442 6.98901 5.30749 7.00034 5.25 7.00034C5.1925 7.00034 5.13557 6.98901 5.08246 6.96699C5.02935 6.94498 4.9811 6.91271 4.94046 6.87203Z" fill="#6BBD6E"/>
                    </svg>
                    <span className="text-green">₹50,000</span>
                    <span className="text-green">|</span>
                    <span className="text-green">10%</span>
                </div>
            </div>
        </div>

        {/* Chart */}
        <div className="h-64">
            <Line data={chartData} options={chartOptions} />
        </div>

        {/* Time Period Buttons */}
        <div className="flex mt-4 space-x-2 justify-center">
            {['1M', '3M', '6M', '1Y', '3Y', 'MAX'].map((period) => (
                <button
                    key={period}
                    className={`px-4 py-1 rounded text-sm ${
                        timePeriod === period
                            ? 'bg-card text-white'
                            : 'bg-gray-900 text-text-100'
                    }`}
                    onClick={() => setTimePeriod(period)}
                >
                    {period}
                </button>
            ))}
        </div>
    </>
    );
};

export default PerformanceMetrics;