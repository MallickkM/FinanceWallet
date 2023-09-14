import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const TransactionFilters = ({ frequency, setFrequency, type, setType, selectedDate, setSelectedDate }) => (
  <div className="container mt-5">
    <h2>MANAGE TRANSACTIONS</h2>
    
    <div className="mb-3">
      <label className="form-label"><h6>Select Frequency</h6></label>
      <select className="form-select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="7">LAST 1 WEEK</option>
        <option value="30">LAST 1 MONTH</option>
        <option value="365">LAST 1 YEAR</option>
        <option value="custom">custom</option>
      </select>
      {frequency === "custom" && (
        <RangePicker className="mt-2" value={selectedDate} onChange={(values) => setSelectedDate(values)} />
      )}
    </div>

    <div className="mb-3">
      <label className="form-label"><h6>Select Type</h6></label>
      <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="all">ALL</option>
        <option value="income">INCOME</option>
        <option value="expense">EXPENSE</option>
      </select>
    </div>
  </div>
);

export default TransactionFilters;
