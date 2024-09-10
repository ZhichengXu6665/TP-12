import React, { useEffect, useRef, useState } from 'react';
import './Visualization.css';
import Papa from 'papaparse';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Visualization = () => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [council, setCouncil] = useState('');
    const [councils, setCouncils] = useState([]);

    useEffect(() => {
        // Parse the CSV file
        Papa.parse(require('./VLGAS_dataset (1).csv'), {
            download: true,
            header: true,
            complete: function(results) {
                processData(results.data);
            }
        });

        function processData(data) {
            
            const allCouncils = [...new Set(data.map(row => row.council))];
            setCouncils(allCouncils);
            setCouncil(allCouncils[0]); 
        }
    }, []);

    useEffect(() => {
        if (council) {
            Papa.parse(require('./VLGAS_dataset (1).csv'), {
                download: true,
                header: true,
                complete: function(results) {
                    const filteredData = results.data.filter(row => row.council === council);
                    const years = filteredData.map(row => row.financial_year);
                    const organicsCollected = filteredData.map(row => parseFloat(row.kerbside_organics_collected_tonnes) || 0);
                    updateChart(years, organicsCollected);
                }
            });
        }
    }, [council]);

    function updateChart(labels, data) {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: `Kerbside Organics Collected (Tonnes)`,
                    data,
                    backgroundColor: 'rgba(142, 68, 173, 0.8)',
                    borderColor: 'rgba(142, 68, 173, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Kerbside Organics Collected by ${council}`,
                        padding: 20,
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    return (
        <div className="visualization-container">
            <div className="header">
                <h1>Does Your Council do Composting?</h1>
            </div>
            <select className="council-selector" onChange={e => setCouncil(e.target.value)} value={council}>
                {councils.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
            <div className="chart-container">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
};

export default Visualization;
