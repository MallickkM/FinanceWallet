import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

Chart.register(CategoryScale);

const IncomeExpenseChart = ({ allTransactions }) => {
    const [chartType, setChartType] = useState('chart1');

    if (!allTransactions || allTransactions.length === 0) return <p>No data available</p>;

    // Generate a list of unique categories from all transactions
    const categories = [...new Set(allTransactions.map(trx => trx.category))].sort();


    // Generate a list of unique dates from all transactions

    const dates = [...new Set(allTransactions.map(trx => trx.date))].sort();


    // Calculate total income and expense for each category
    const incomeData = categories.map(category => {
        return allTransactions
            .filter(trx => trx.type === 'income' && trx.category === category)
            .reduce((sum, trx) => sum + trx.amount, 0);
    });

    const expenseData = categories.map(category => {
        return allTransactions
            .filter(trx => trx.type === 'expense' && trx.category === category)
            .reduce((sum, trx) => sum + trx.amount, 0);
    });

    // Calculate total income and expense for each date
    const incomeeData = dates.map(date => {
        return allTransactions
            .filter(trx => trx.type === 'income' && trx.date === date)
            .reduce((sum, trx) => sum + trx.amount, 0);
    });

    const expenseeData = dates.map(date => {
        return allTransactions
            .filter(trx => trx.type === 'expense' && trx.date === date)
            .reduce((sum, trx) => sum + trx.amount, 0);
    });

    //PIECHART INCOME 
    const incomeCategories = categories.filter(category => 
        allTransactions.some(trx => trx.type === 'income' && trx.category === category)
    );
    const incomeByCategory = categories.map(category => {
        return allTransactions
            .filter(trx => trx.type === 'income' && trx.category === category)
            .reduce((sum, trx) => sum + trx.amount, 0);
    });


    const incomepieData = {
        labels: incomeCategories,
        datasets: [{
            data: incomeByCategory,
            backgroundColor: [
                'rgba(130, 224, 170, 0.6)',  // Color for category 1
                'rgba(236, 112, 99, 0.6)',   // Color for category 2
                'rgba(36, 112, 99, 0.6)',
                'rgba(206, 112, 99, 0.6)',
                'rgba(136, 112, 99, 0.6)',     
            ],
            hoverBackgroundColor: [
                'rgba(130, 224, 170, 0.8)',  // Hover Color for category 1
                'rgba(236, 112, 99, 0.8)',   // Hover Color for category 2
                // Add more hover colors as per your categories
            ]
        }]
    };

      //PIECHART EXPENSE
      const expenseCategories = categories.filter(category => 
        allTransactions.some(trx => trx.type === 'expense' && trx.category === category)
    );
    const expenseByCategory = categories.map(category => {
        return allTransactions
            .filter(trx => trx.type === 'expense' && trx.category === category)
            .reduce((sum, trx) => sum + trx.amount, 0);
    });

    const expensePieData = {
        labels: expenseCategories,
        datasets: [{
            data: expenseByCategory,
            backgroundColor: [
                'rgba(130, 224, 170, 0.6)',  // Color for category 1
                'rgba(236, 112, 99, 0.6)',   // Color for category 2
                'rgba(36, 112, 99, 0.6)',
                'rgba(206, 112, 99, 0.6)',
                'rgba(136, 112, 99, 0.6)',     
            ],
            hoverBackgroundColor: [
                'rgba(130, 224, 170, 0.8)',  // Hover Color for category 1
                'rgba(236, 112, 99, 0.8)',   // Hover Color for category 2
                // Add more hover colors as per your categories
            ]
        }]
    };

    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Income in INR',
                data: incomeData,
                backgroundColor: 'rgba(130, 224, 170, 0.2)',
                borderColor: '#2ECC71',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(130, 224, 170, 0.5)'
            },
            {
                label: 'Expense in INR',
                data: expenseData,
                backgroundColor: 'rgba(236, 112, 99, 0.2)',
                borderColor: '#E74C3C',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(236, 112, 99, 0.5)'
            }
        ]
    };

    const dataa = {
        labels: dates,
        datasets: [
            {
                label: 'Income in INR',
                data: incomeeData,
                backgroundColor: 'rgba(130, 224, 170, 0.2)',
                borderColor: '#2ECC71',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(130, 224, 170, 0.5)'
            },
            {
                label: 'Expense in INR',
                data: expenseeData,
                backgroundColor: 'rgba(236, 112, 99, 0.2)',
                borderColor: '#E74C3C',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(236, 112, 99, 0.5)'
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category'
            },
            y: {
                type: 'linear',
                beginAtZero: true
            }
            
        },
        responsive: true,
    maintainAspectRatio: false,
        
    };

    const chartContainerStyle = {
        border: '2px solid #333',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        borderRadius: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
        marginLeft: '5%',
        marginRight: '5%',
        height: '60vh'
    };
    
  
    const pieOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,  // Makes sure the pie chart remains a circle. Adjust as necessary.
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
                height: '20px'
            }
        }
    };
  
    const renderChart = () => {
        switch (chartType) {
            case 'chart1':
                return <Line data={data} options={options} />;
            case 'chart2':
                return <Line data={dataa} options={options} />;
            case 'chart5':
                return <Bar data={data} options={options} />;
            case 'chart6':
                return <Bar data={dataa} options={options} />;
            case 'chart3':
                return <Pie  data={incomepieData} options={pieOptions} />;
            case 'chart4':
                return <Pie  data={expensePieData} options={pieOptions} />;
                    
            default:
                return <Line data={data} options={options} />;
        }
    };



    return (
        <div>
            <div className="btn-group" role="group" aria-label="Chart buttons" style={{ marginTop: '20px', marginLeft: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setChartType('chart1')}>Income VS Expense by category LineChart</button>
                <button type="button" className="btn btn-secondary" onClick={() => setChartType('chart2')}>Income VS Expense by date LineChart</button>
                <button type="button" className="btn btn-secondary" onClick={() => setChartType('chart5')}>Income VS Expense by category BarChart</button>
                <button type="button" className="btn btn-secondary" onClick={() => setChartType('chart6')}>Income VS Expense by date BarChart</button>
                <button type="button" className="btn btn-secondary" onClick={() => setChartType('chart3')}>PIECHART INCOME</button>
                <button type="button" className="btn btn-secondary" onClick={() => setChartType('chart4')}>PIECHART EXPENSE</button>
            </div>
            <div style={chartContainerStyle}>
            
                {renderChart()}
            </div>
        </div>
    );
}

export default IncomeExpenseChart;
