import React from 'react';
import { Progress, message } from "antd";
import BudgetProgressCard from './BudgetCard';

const ChartBudget = ({ allBudget, allTransactions }) => {


    const getAggregatedBudget = (budgets) => {
        let aggregated = {
            amount: 0,
            categories: {}
        };

        budgets.forEach(budget => {
            aggregated.amount += budget.amount;

            // Aggregate categories
            for (let category in budget.categories) {
                if (aggregated.categories[category]) {
                    aggregated.categories[category] += budget.categories[category];
                } else {
                    aggregated.categories[category] = budget.categories[category];
                }
            }
        });

        return aggregated;
    };

    const getCategoryExpense = (category) => {
        return allTransactions
            .filter(transaction => transaction.category.toLowerCase() === category && transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    };

    const totalBudget = getAggregatedBudget(allBudget).amount;

    const totalExpenseTransactions = allTransactions.filter(transaction => transaction.type === "expense");
    const totalExpense = totalExpenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    

    const calculatePercentage = (expense, budget) => {
        if(budget <= 0) return 0;
        return (expense / budget * 100).toFixed(0);
    }

    const aggregatedBudget = getAggregatedBudget(allBudget);
    const aggregatedExpense = {}; // Calculate aggregated expenses for each category

Object.keys(aggregatedBudget.categories).forEach(category => {
    aggregatedExpense[category] = getCategoryExpense(category);
});


    return (
        
        <div>
     
            <div className="budget-progress-cards">
            <div className="cards-wrapper">
            {Object.keys(aggregatedBudget.categories).map(category => (
                <BudgetProgressCard 
                    key={category}
                    category={category}
                    budget={aggregatedBudget.categories[category]}
                    expense={aggregatedExpense[category]}
                />
            ))}
        </div>
            <h4>Budget vs. Expense Comparison</h4>
            <Progress 
                type="circle"
                strokeColor={{
                    '100%': 'green',
                    '75%': 'yellow',
                    '90%': 'orange',
                    '0%': 'red',
                }}
                percent={calculatePercentage(totalExpense, totalBudget)}
            />
            
            <p>Total Budget: {totalBudget}</p>
            <p>Total Expense: {totalExpense}</p>

            {/* Categories Comparison 
            <div>
                <h4>Category-wise Comparison</h4>
                {Object.keys(aggregatedBudget.categories).map(category => (
                    <div key={category}>
                        <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                        <Progress
                            type="circle"
                            strokeColor={{
                                '0%': 'green',
                                '100%': 'red',
                            }}
                            percent={calculatePercentage(getCategoryExpense(category), aggregatedBudget.categories[category])}
                        />
                        <p>Budget for {category}: {aggregatedBudget.categories[category]}</p>
                        <p>Expense for {category}: {getCategoryExpense(category)}</p> 
                    </div> 
                ))}
            </div> */}
        </div>
        </div>
    );
}

export default ChartBudget;
