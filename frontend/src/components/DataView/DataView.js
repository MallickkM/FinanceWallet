import React from "react";
import { DatabaseFilled, AreaChartOutlined } from "@ant-design/icons";

const DataView = ({ viewData, setViewData, setFormType, setShowModal }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <div>
      <div className="mxx-2">
        <DatabaseFilled
          className={`mx-2 ${
            viewData === "table" ? "active-icon" : "inactive-icon"
          }`}
          onClick={() => setViewData("table")}
        />
        <AreaChartOutlined
          className={`mx-2 ${
            viewData === "analytics" ? "active-icon" : "inactive-icon"
          }`}
          onClick={() => setViewData("analytics")}
        />
      </div>
    </div>
    <button
      className="btn btn-success mr-2"
      onClick={() => {
        setFormType("income");
        setShowModal(true);
      }}
    >
      Add Income
    </button>
    <button
      className="btn btn-danger mr-2"
      onClick={() => {
        setFormType("expense");
        setShowModal(true);
      }}
    >
      Add Expense
    </button>
  </div>
);

export default DataView;
