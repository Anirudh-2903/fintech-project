// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Investments } from "@/types";
import { PerformanceMetricsSkeleton } from "./PerformanceMetricsSkeleton"; // Import the skeleton component

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const PerformanceMetrics = ({ investments }: { investments: Investments[] }) => {
    const [timePeriod, setTimePeriod] = useState('3M');
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [totalReturns, setTotalReturns] = useState(0);
    const [returnPercentage, setReturnPercentage] = useState('0.00');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [isLoading, setIsLoading] = useState(true); // State for skeleton loading

    // Static colors for 5 investments
    const investmentColors = [
        '#0088FF', // Blue
        '#FF6384', // Pink
        '#36A2EB', // Light Blue
        '#FFCE56', // Yellow
        '#4BC0C0', // Teal
    ];

    // Function to calculate portfolio value over time for each investment
    const calculatePortfolioValue = (period: string) => {
        const currentDate = new Date();
        const periodMap: { [key: string]: number } = {
            '3M': 3,  // 3 months
            '6M': 6,  // 6 months
            '1Y': 12, // 1 year
            '3Y': 36, // 3 years
            '5Y': 60, // 5 years
        };

        const months = periodMap[period];
        const labels = [];
        const datasets = investments.map((investment, index) => {
            const data = [];
            for (let i = 0; i < months; i++) {
                const date = new Date(currentDate);
                date.setMonth(currentDate.getMonth() - (months - i - 1)); // Corrected date calculation
                if (index === 0) {
                    labels.push(`${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`);
                }

                // Calculate investment value for this month
                const monthsSinceInvestment = (date.getFullYear() - new Date(investment.investment_date).getFullYear()) * 12 +
                    (date.getMonth() - new Date(investment.investment_date).getMonth());
                const growth = Math.pow(1 + investment.returns / 100, monthsSinceInvestment / 12);
                data.push(investment.amount_invested * growth);
            }

            return {
                label: investment.mutual_fund_name,
                data,
                borderColor: investmentColors[index % investmentColors.length], // Use static colors
                backgroundColor: 'rgba(0, 136, 255, 0.1)',
                tension: 0.4,
                fill: false,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#14B8FF',
                pointHoverBackgroundColor: '#14B8FF',
                pointBorderWidth: 1,
            };
        });

        setChartData({
            labels,
            datasets,
        });

        // Recalculate total portfolio value and returns for the selected period
        const totalValue = datasets.reduce((sum, dataset) => sum + dataset.data[0], 0); // Latest value
        const totalInitial = investments.reduce((sum, investment) => sum + investment.amount_invested, 0);
        const returns = totalValue - totalInitial;
        const percentage = ((returns / totalInitial) * 100).toFixed(2);

        setTotalPortfolioValue(totalValue);
        setTotalReturns(returns);
        setReturnPercentage(percentage);
    };

    // Update chart data when time period changes
    useEffect(() => {
        calculatePortfolioValue(timePeriod);
    }, [timePeriod, investments]);

    // Simulate loading for 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Hide skeleton after 5 seconds
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#262626',
                titleColor: '#B0B0B0',
                bodyColor: '#B0B0B0',
                borderColor: '#262626',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    autoSkip: false,
                },
            },
            y: {
                grid: {
                    color: '#3D3D3D',
                },
                ticks: {
                    display: false,
                },
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
    };

    return (
        <>
            {isLoading ? (
                <PerformanceMetricsSkeleton /> // Show skeleton while loading
            ) : (
                <>
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-4">Performance Summary</h2>
                        <div className="bg-dark-100 rounded-xl p-4 w-fit">
                            <div className="text-lg text-text-200 font-bold">{totalPortfolioValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
                            <div className="flex items-center gap-1 text-sm mt-1">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                                     style={{
                                         transform: totalReturns >= 0 ? "rotate(0deg)" : "rotate(180deg)",
                                     }}>
                                    <path d="M7 12.6875C8.12488 12.6875 9.2245 12.3539 10.1598 11.729C11.0951 11.104 11.8241 10.2158 12.2546 9.17651C12.685 8.13726 12.7977 6.99369 12.5782 5.89042C12.3588 4.78716 11.8171 3.77374 11.0217 2.97833C10.2263 2.18292 9.21284 1.64124 8.10957 1.42178C7.00631 1.20233 5.86274 1.31496 4.82348 1.74543C3.78423 2.17591 2.89596 2.90489 2.27101 3.84019C1.64606 4.7755 1.3125 5.87512 1.3125 7C1.31409 8.50793 1.91382 9.95364 2.98009 11.0199C4.04635 12.0862 5.49207 12.6859 7 12.6875ZM7 2.1875C7.95182 2.1875 8.88227 2.46975 9.67368 2.99855C10.4651 3.52736 11.0819 4.27896 11.4462 5.15833C11.8104 6.0377 11.9057 7.00534 11.72 7.93887C11.5343 8.87241 11.076 9.72991 10.4029 10.403C9.72991 11.076 8.8724 11.5343 7.93887 11.72C7.00534 11.9057 6.0377 11.8104 5.15833 11.4462C4.27896 11.0819 3.52735 10.4651 2.99855 9.67368C2.46974 8.88227 2.1875 7.95182 2.1875 7C2.18894 5.72409 2.69644 4.50085 3.59864 3.59865C4.50085 2.69644 5.72409 2.18895 7 2.1875ZM4.94046 6.87203C4.89979 6.8314 4.86752 6.78315 4.8455 6.73004C4.82348 6.67692 4.81215 6.61999 4.81215 6.5625C4.81215 6.505 4.82348 6.44807 4.8455 6.39496C4.86752 6.34185 4.89979 6.2936 4.94046 6.25297L6.69047 4.50297C6.7311 4.46229 6.77935 4.43002 6.83246 4.408C6.88557 4.38599 6.9425 4.37465 7 4.37465C7.05749 4.37465 7.11442 4.38599 7.16753 4.408C7.22064 4.43002 7.2689 4.46229 7.30953 4.50297L9.05953 6.25297C9.14162 6.33506 9.18774 6.4464 9.18774 6.5625C9.18774 6.6786 9.14162 6.78994 9.05953 6.87203C8.97744 6.95412 8.86609 7.00024 8.75 7.00024C8.6339 7.00024 8.52256 6.95412 8.44047 6.87203L7.4375 5.86851L7.4375 9.1875C7.4375 9.30353 7.3914 9.41481 7.30936 9.49686C7.22731 9.57891 7.11603 9.625 7 9.625C6.88396 9.625 6.77268 9.57891 6.69064 9.49686C6.60859 9.41481 6.5625 9.30353 6.5625 9.1875L6.5625 5.86851L5.55953 6.87203C5.5189 6.91271 5.47064 6.94498 5.41753 6.96699C5.36442 6.98901 5.30749 7.00034 5.25 7.00034C5.1925 7.00034 5.13557 6.98901 5.08246 6.96699C5.02935 6.94498 4.9811 6.91271 4.94046 6.87203Z"
                                          fill={totalReturns >= 0 ? "#6BBD6E" : "#FF4D4F"}
                                    />
                                </svg>
                                <span className={ totalReturns < 0 ? "text-red" : "text-green"}>{totalReturns.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                                <span className={ totalReturns < 0 ? "text-red" : "text-green"}>|</span>
                                <span className={ returnPercentage < 0 ? "text-red" : "text-green"}>{returnPercentage}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-64">
                        <Line data={chartData} options={chartOptions} />
                    </div>

                    {/* Time Period Buttons */}
                    <div className="flex mt-4 space-x-2 justify-center">
                        {['3M', '6M', '1Y', '3Y', '5Y'].map((period) => (
                            <button
                                key={period}
                                className={`px-4 py-1 rounded text-sm ${
                                    timePeriod === period
                                        ? 'bg-card-bg text-white'
                                        : 'bg-gray-900 text-text-100'
                                }`}
                                onClick={() => setTimePeriod(period)}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default PerformanceMetrics;