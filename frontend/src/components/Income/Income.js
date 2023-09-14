import React, { useState, useEffect } from "react";
import { message, Table, DatePicker, } from "antd";
//import { DatabaseFilled ,AreaChartOutlined } from '@ant-design/icons'
import { EditOutlined, DeleteOutlined, } from "@ant-design/icons/lib/icons";
//import style from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import axios from "axios"; // Make sure you have axios imported
//import jwt_decode from "jwt-decode";
import Analytics from "../Charts/Analytics";
import { getDecodedToken } from "../utils/utils";
import TransactionModal from "../transaction/transactionModal";
import Spinner from "../Spinner/Spinner";
import TransactionFilters from "../TransactionFilters/TransactionFilters";
import DataView from "../DataView/DataView";
import Budget from "../Budget/Budget";
import IncomeExpenseChart from '../Charts/BarChart';
import { useTransactions } from "../Context/Context";
const { RangePicker } = DatePicker;


const Income = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ setAllTransactions] = useState([]); //to see all transactions
  const [frequency, setFrequency] = useState("7"); //for filters
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [edittable, setEdittable] = useState(null); //for actions - edit, delete
  const [viewData, setViewData] = useState('table'); //for graphs etc
  const [formType, setFormType] = useState(""); // income and expense
  const {
    allTransactions, fetchAllTransactions, addTransaction, editTransaction, deleteTransaction
} = useTransactions();

  //table data for fields
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: "amount",
      dataIndex: "amount",
    },
    {
      title: "type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEdittable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className="mx-2" onClick = {() => {handleDelete(record)}} />
        </div>
      )
    },
  ];

  //getall transactions table we making

  //useEffect Hook

  useEffect(() => {
    const decodedToken = getDecodedToken();
    if (decodedToken) {
        const userid = decodedToken._id;
        fetchAllTransactions(userid, frequency, selectedDate, type);
    } else {
        console.error("Token Not Found");
    }
}, [frequency, selectedDate, type]);

// delete handler
const handleDelete = async (record) => {
  try {
      setLoading(true);
      await deleteTransaction(record._id);
      setLoading(false);
      message.success("Transaction Deleted!");
  } catch (error) {
      console.error(error);
      setLoading(false);
      message.error("Unable to Delete");
  }
}
  //form handling

  const handleSubmit = async (values) => {
    try {
      const decodedToken = getDecodedToken();
        if (decodedToken) {
            const userid = decodedToken._id;
            setLoading(true);

            if (edittable) {
                await editTransaction(edittable._id, { ...values, userid });
                message.success("Transaction Updated Successfully!");
            } else {
                await addTransaction({
                    ...values,
                    userid
                });
                message.success("Transaction Added Successfully!");
            }

            setShowModal(false);
            setEdittable(null);
        } else {
            console.error("Token Not Found");
        }
    } 
    
    catch (error) {
      console.error(error);
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  return (
    <div>
{/* SPINNER */}
  {loading && <Spinner />}

      <div>
      <div className="container mt-5">
      <TransactionFilters frequency={frequency} setFrequency={setFrequency} type={type} setType={setType} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

</div>
{/* DATAVIEW OF BUTTONS LIKE ADD, TOGGLE BETWEEN TABLE AND CHARTS ETC */}
<DataView viewData={viewData} setViewData={setViewData} setFormType={setFormType} setShowModal={setShowModal} />
      </div>

{/* TRANSACTION TABLE */}

      <div className="style.content">
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransactions} />
        : <Analytics allTransactions={allTransactions}/>
        }     
      </div>
      {/* TRANSACTION: MODAL OF TABLE */}
      <TransactionModal 
  showModal={showModal}
  setShowModal={setShowModal}
  handleSubmit={handleSubmit}
  edittable={edittable}
  formType={formType}
/>

    </div>
  );
};

export default Income;
