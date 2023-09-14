import React from 'react';
import IncomeExpenseChart from '../Charts/Charts'
import { useTransactions } from '../Context/Context';

const Dashboard = () => {
    const { allTransactions } = useTransactions();

    return (
        <div>
            {/* ... other dashboard components ... */}
            <IncomeExpenseChart allTransactions={allTransactions} />
            {/* ... other dashboard components ... */}
        </div>
    );
};

export default Dashboard;
