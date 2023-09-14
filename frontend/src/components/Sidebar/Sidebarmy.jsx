
import React, { useState } from 'react';
import "./Sidebarstyle.css";
import {
    FaTh,
    FaBars,
    FaRegChartBar,
    FaMoneyCheckAlt,
    FaMoneyBillWave,

    
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebarmy = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/Income",
            name:"Income",
            icon:<FaMoneyCheckAlt/>
        },
        {
            path:"/Expense",
            name:"UserExpense",
            icon:<FaMoneyBillWave/>
        },
        {
            path:"/Transaction",
            name:"Transaction",
            icon:<FaRegChartBar/>
        },

    ]
    return (
        <div className="container">
        <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
            <div className="top_section">
                <h1 style={{display: isOpen ? "block" : "none"}} className="logo"></h1>
                <div style={{marginLeft: isOpen ? "5px" : "0px"}} className="bars">
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main>{children}</main>
           <main>{children}</main>
        </div>
    );
};

export default Sidebarmy;