import React from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import moment from 'moment';

const TransactionModal = ({ showModal, setShowModal, handleSubmit, edittable, formType }) => {

  return (
    <Modal
      title={edittable ? 'Edit Transaction' : (formType === 'income' ? 'Add Income' : 'Add Expense')}
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={false}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{...edittable, type: formType}}
        style={{
          backgroundColor: "#cfe8fc",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.35)",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select>
            {/* ... Category logic ... */}
            {formType === 'income' && (
      <>
        <Select.Option value="9-5 Job">9-5 Job</Select.Option>
              <Select.Option value="Freelance">Freelance</Select.Option>
              <Select.Option value="Influencer">Influencer</Select.Option>
              <Select.Option value="Investment">Investment</Select.Option>
              <Select.Option value="Trading">Trading</Select.Option>
      </>
    )}
    {formType === 'expense' && (
      <>
        <Select.Option value="Food">Food</Select.Option>
        <Select.Option value="Bills">Bills</Select.Option>
        <Select.Option value="Travelling">Travelling</Select.Option>
        <Select.Option value="HealthCare">HealthCare</Select.Option>
        <Select.Option value="Misc">Misc</Select.Option>

      </>
    )}
          </Select>
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Date" name="date">
        <Input type="date" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default TransactionModal;
