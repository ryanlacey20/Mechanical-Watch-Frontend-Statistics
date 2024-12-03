// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = ({ selectedTable }) => {
    console.log("selectedTable", selectedTable)
    const [tableData, setTableData] = useState(null);
    useEffect(() => {
        if (selectedTable) {
             console.log("this ran")

            // Fetch data for the selected table
            fetch('http://127.0.0.1:5000/stat_data/get_daily_deviation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ forTable: selectedTable }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setTableData(data);  // Store the fetched data
                    console.log("debuhgsgsgsg", data)
                })
                .catch((error) => console.error('Error fetching table data:', error));
        }
    }, [selectedTable]);  // Re-fetch data when the selected table changes

    if (!tableData) {
        return <p>Loading data...</p>;
    }

    // Prepare chart data
    const chartData = {
        labels: tableData.map((row) => row["Day No"]),  // X-axis: Day No
        datasets: [
            {
                label: "Daily Deviation",  // Y-axis: Daily Deviation
                data: tableData.map((row) => row["Daily Deviation"]),
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="dashboard">
            <h2>Dashboard for {selectedTable}</h2>
            
            {/* Table displaying the Day No and Daily Deviation values */}
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Day No</th>
                            <th>Daily Deviation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row["Day No"]}</td>
                                <td>{row["Daily Deviation"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Line Chart displaying the graph */}
            <div className="chart">
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
