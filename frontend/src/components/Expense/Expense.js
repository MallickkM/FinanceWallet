import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import './Expense.css';


const Expense = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
    amount: '',
    type: '',
    date: '',
    reference: '',
    description: ''
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //form handling
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setLoading(true);
        await axios.post("/transactions/add-transaction", { ...values, email: user.email });
        setLoading(false);
        alert('Transaction Added Successfully!');
      } else {
        throw new Error("User Not Found");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('Failed to add transaction');
    }
  }
  useEffect(() => {
    //document.body.style.background = '#68ece1';
    //document.body.style.height = "100vh";
    return () => {
      //document.body.style.backgroundColor = null;  // resets the background color when component unmounts
    }
  }, []);  // empty dependency array means this effect will only run once

  return (
    <div className="background">
    <div className="container">
        <div className="box">
          <h2>Expense Income</h2>
        </div>
        <div className="col-12">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleChange('email')} />
              </Form.Group>

              <Form.Group controlId="formExpenseAmount">
                <Form.Label>Expense Amount</Form.Label>
                <Form.Control type="text" onChange={handleChange('amount')} />
              </Form.Group>

              <Form.Group controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" onChange={handleChange('type')}>
                  <option value="Movie">Movie</option>
                  <option value="Food">Food</option>
                  <option value="Bills">Bills</option>
                  <option value="Travelling">Travelling</option>
                  <option value="Misc">Misc</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" onChange={handleChange('date')} />
              </Form.Group>

              <Form.Group controlId="formExpenseReference">
                <Form.Label>Expense Reference</Form.Label>
                <Form.Control type="text" onChange={handleChange('reference')} />
              </Form.Group>

              <Form.Group controlId="formExpenseDescription">
                <Form.Label>Expense Description</Form.Label>
                <Form.Control type="text" onChange={handleChange('description')} />
              </Form.Group>

              <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
      </div>
    </div>
  );
};

export default Expense;
