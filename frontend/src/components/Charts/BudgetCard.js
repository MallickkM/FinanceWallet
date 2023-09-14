import React from 'react';
import { Card, Progress } from 'antd';
import Styles from '../Charts/chart.module.css';

const BudgetProgressCard = ({ category, budget, expense }) => {
    const calculatePercentage = () => {
        if(budget <= 0) return 0;
        return (expense / budget * 100).toFixed(0);
    }

    const remainingBudget = budget - expense; // Calculating the remaining budget.

    return (
        
        <Card className={Styles["card-container"]} title={category.charAt(0).toUpperCase() + category.slice(1)}>
            <Progress 
             strokeColor={{
                '0%': 'green',
                '50%': 'green',
                '75%': 'yellow',
                '90%': 'orange',
                '100%': 'red',
            }}
                percent={calculatePercentage()}
                showInfo={false}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Expense: ${expense}</span>
                <span>Remaining: ${remainingBudget}</span>  {/* Displaying the remaining budget here */}
                <span>Total Budget: ${budget}</span>
            </div>
        </Card>
    );
}

export default BudgetProgressCard;
