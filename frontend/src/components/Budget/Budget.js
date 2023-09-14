import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table } from "antd";
import { EditOutlined, DeleteOutlined, UnderlineOutlined, AreaChartOutlined } from "@ant-design/icons/lib/icons";
import { useTransactions } from "../Context/Context";
import Spinner from "../Spinner/Spinner";

import axios from "axios";
import { getDecodedToken } from "../utils/utils";
import ChartBudget from "../Charts/ChartBudget";


const Budget = () => {
  const [showBudget, setShowBudget] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [allBudget, setAllBudget] = useState([]);
  const [editBudget, setEditBudget] = useState(null)
  const [viewBudget, setViewBudget] = useState('tableBudget')
  const { allBudget, setAllBudget, allTransactions } = useTransactions();


//getall transactions. useffect is used
const getAllBudget = async () => {
    try {
        const decodedToken = getDecodedToken(); // Use the utility function
        let userid;
        if (decodedToken) {
            userid = decodedToken._id;
            console.log("User ID:", userid);
        }
        
        setLoading(true);
        
        const res = await axios.post('/api/budget/get-budget', { userid: userid }); //DO NOT FORGET TO ADD /api/ 
        
        setLoading(false);
        
        setAllBudget(res.data);
        console.log(res.data);
        console.log(allBudget)
        
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}
{/*
const BudgetStatus = ({ budget }) => {
  return (
    <div>
      <h2>Your Budget Status</h2>
      <p>Overall Budget: ${budget.amount}</p>
      {budget.amount < 0 && <p style={{ color: 'red' }}>You've exceeded your budget!</p>}
      <p>Food: ${budget.categories.food}</p>
      <p>Bills: ${budget.categories.bills}</p>
      <p>Travelling: ${budget.categories.travelling}</p>
      <p>HealthCare: ${budget.categories.healthCare}</p>
      <p>Misc: ${budget.categories.misc}</p>
      {/* ... Add more categories if needed ... 
    </div>
  );
}; 

*/}

const getAggregatedBudget = (budgets) => {
  let aggregated = {
    amount: 0,
    categories: {
      food: 0,
      bills: 0,
      travelling: 0,
      healthCare: 0,
      misc: 0,
      //... Add more categories if needed ...
    }
  };
  
  budgets.forEach(budget => {
    aggregated.amount += budget.amount;
    for (let category in budget.categories) {
      aggregated.categories[category] += budget.categories[category];
    }
  });
  
  return aggregated;
};
//useEffect Hook. to call the above
useEffect(() => {
     getAllBudget();
}, [] )

  //table data
  const columns = [
    {
        title: "amount",
        dataIndex: "amount",
    },
    {
        title: "Food Budget",
        dataIndex: ["categories", "food"],
    },
    {
        title: "Bills Budget",
        dataIndex: ["categories", "bills"],
    },
    {
        title: "Travelling Budget",
        dataIndex: ["categories", "travelling"],
    },
    {
        title: "HealthCare Budget",
        dataIndex: ["categories", "healthCare"],
    },
    {
        title: "Misc Budget",
        dataIndex: ["categories", "misc"],
    },

    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => { 
            setEditBudget(record)
            setShowBudget(true); //when clicking on edit, the modal/form should be prefilled with the record.
          }}/>
          <DeleteOutlined className="mx-2"
          onClick={() => {budgetDelete(record)}}/>
        </div>
      )
    }
];

//delete handler

const budgetDelete = async (record) => {
  try {
    setLoading(true);
    await axios.post("/api/budget/delete-budget",  {budgetId:record._id})
    setLoading(false);
    message.success("Budget Deleted")
  } catch (error) {
    setLoading(false);
    console.error(error);
    message.error("Unable to delete Budget");
  }
}

  // form handling
  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const decodedToken = getDecodedToken(); // Use the utility function
      if (decodedToken) {
        const userid = decodedToken._id;
        console.log("User ID:", userid);
        setLoading(true);
        //getting /budget from index.js backend
        if (editBudget) {
          await axios.post("/api/budget/edit-budget", {
            payload: {
              ...values,
              userid: userid,
            },
            budgetId : editBudget._id
          })
          setLoading(false);
          message.success("Budget Updated Successfully!")
          getAllBudget(); 
        } else {
          await axios.post('/api/budget/add-budget',
          {
              userid: userid,
              ...values
          })
          setLoading(false);
          message.success("Budget Added Successfully!")
        }

        setShowBudget(false);
        setEditBudget(null);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      message.error("Failed to add Budget");
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      <div className="filters">
        <div>Add budget by categories</div>
        <div>
            <div className="mx-2" />
            <UnderlineOutlined className={`mx-2 ${viewBudget === 'tableBudget'}`}
            onClick={() => setViewBudget('tableBudget')}/>
            <AreaChartOutlined className={`mx-2 ${viewBudget === 'chartBudget'}`}
             onClick={() => setViewBudget('chartBudget')}/>
          </div>
        <div>
 
          <button
            className="btn btn-primary"
            onClick={() => setShowBudget(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
      {viewBudget === 'tableBudget' 
        ? <Table columns={columns} dataSource={allBudget} />
        : (
            <>
                <ChartBudget allBudget={allBudget} allTransactions={allTransactions} />
              {/*  <BudgetStatus budget={getAggregatedBudget(allBudget)} /> */}
            </>
          )
      }


      </div>
      <Modal
        title={editBudget ? 'Edit Budget' : 'Add Budget'}
        open={showBudget}
        onCancel={() => setShowBudget(false)}
        footer={false}
      >
     <Form layout="vertical" onFinish={handleSubmit}
     initialValues={editBudget}>
  {/* Overall Budget Field */}
  <Form.Item label="Overall Budget" name="amount">
    <Input type="number" placeholder="Enter overall budget amount" />
  </Form.Item>

  {/* Category Wise Budget Fields */}
  <Form.Item label="Food Budget" name={['categories', 'food']}>
    <Input type="number" placeholder="Enter budget for food" />
  </Form.Item>

  <Form.Item label="Bills Budget" name={['categories', 'bills']}>
    <Input type="number" placeholder="Enter budget for bills" />
  </Form.Item>

  <Form.Item label="Travelling Budget" name={['categories', 'travelling']}>
    <Input type="number" placeholder="Enter budget for travelling" />
  </Form.Item>

  <Form.Item label="HealthCare Budget" name={['categories', 'healthCare']}>
    <Input type="number" placeholder="Enter budget for healthcare" />
  </Form.Item>

  <Form.Item label="Misc Budget" name={['categories', 'misc']}>
    <Input type="number" placeholder="Enter budget for miscellaneous expenses" />
  </Form.Item>

  {/* Add more categories based on your schema ... */}

  {/* Submit Button */}
  <div className="d-flex justify-content-end">
    <button type="submit" className="btn btn-primary">
      SAVE
    </button>
  </div>
</Form>

      </Modal>
   </div>
  );
};

export default Budget;