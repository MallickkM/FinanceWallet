import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransactions = [] }) => { 

  const categories = [
    "9-5 Job",
    "Freelance",
    "Influencer",
    "Investment",
    "Trading",
    "Food",
    "Bills",
    "Travelling",
    "HealthCare",
    "Misc"
  ];

  const totalTransaction = allTransactions.length;

  const totalIncomeTransactions = allTransactions.filter(transaction => transaction.type === "income");
  const totalExpenseTransactions = allTransactions.filter(transaction => transaction.type === "expense");

  const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

  const totalIncomeTurnover = totalIncomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = totalExpenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent = (totalIncomeTurnover / (totalIncomeTurnover + totalExpenseTurnover)) * 100;
  const totalExpenseTurnoverPercent = 100 - totalIncomeTurnoverPercent;

  const categorizedIncome = categories.map(category => {
    const transactions = allTransactions.filter(transaction => transaction.type === "income" && transaction.category === category);
    const amount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    return {
      category,
      amount
    };
  });

  const categorizedExpense = categories.map(category => {
    const transactions = allTransactions.filter(transaction => transaction.type === "expense" && transaction.category === category);
    const amount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    return {
      category,
      amount
    };
  });

  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions: {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income: {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense: {totalExpenseTransactions.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total TurnOver: {totalIncomeTurnover + totalExpenseTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
              
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            Overall Comparison: Income vs Expense
          </div>
          <div className="card-body">
            <h5 className="text-success">
              Income: {totalIncomeTurnover}
            </h5>
            <h5 className="text-danger">
              Expense: {totalExpenseTurnover}
            </h5>
            <Progress
              type="circle"
              strokeColor={{
                '0%': 'green',
                '100%': 'red',
              }}
              className="mx-2"
              percent={(totalIncomeTurnover / (totalIncomeTurnover + totalExpenseTurnover) * 100).toFixed(0)}
            />
          </div>
        </div>
      </div>
        <div className="col-md-4">
          <h4>Categorized Income</h4>
          {
            categorizedIncome.map(({ category, amount }) => 
              amount > 0 && 
              <div className="card">
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress 
                  percent ={((amount/totalIncomeTurnover) * 100).toFixed(0)} />
                </div>
              </div>
            )
          }
          <h4 className="mt-4">Categorized Expense</h4>
          {
            categorizedExpense.map(({ category, amount }) => 
              amount > 0 && 
              <div className="card">
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress 
                  percent ={((amount/totalExpenseTurnover) * 100).toFixed(0)} />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Analytics;
