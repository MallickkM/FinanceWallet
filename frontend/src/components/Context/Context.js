import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const TransactionsContext = createContext();

export const useTransactions = () => {
    return useContext(TransactionsContext);
};

export const TransactionsProvider = ({ children }) => {
    const [allTransactions, setAllTransactions] = useState([]);
    const [allBudget, setAllBudget] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllTransactions = useCallback(async (userid, frequency, selectedDate, type) => {
        try {
            const res = await axios.post("/api/transactions/get-transactions", {
                userid,
                frequency,
                selectedDate,
                type
            });
            setAllTransactions(res.data);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    }, []);

    const addTransaction = async (transaction) => {
        try {
            const response = await axios.post("/api/transactions/add-transaction", transaction);
            if(response.data && response.data.success) {
                setAllTransactions(prevTransactions => [...prevTransactions, response.data.transaction]);
            }
        } catch (error) {
            console.error("Failed to add transaction:", error);
        }
    };

    const editTransaction = async (transactionId, updatedData) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/transactions/edit-transaction", {transactionId, ...updatedData});
            console.log("Edit Response:", response.data);
            setAllTransactions(prevTransactions => 
                prevTransactions.map(trx => trx._id === transactionId ? response.data : trx)
            );
        } catch (error) {
            console.error("Failed to edit transaction:", error);
        } finally {
            console.log("Setting loading to false");
            setLoading(false);
        }
    };
    

    const deleteTransaction = async (transactionId) => {
        try {
            await axios.post("/api/transactions/delete-transaction", {transactionId});
            setAllTransactions(prevTransactions => 
                prevTransactions.filter(trx => trx._id !== transactionId)
            );
        } catch (error) {
            console.error("Failed to delete transaction:", error);
        }
    };

    return (
        <TransactionsContext.Provider value={{
            allTransactions, setAllTransactions, allBudget, setAllBudget,
            fetchAllTransactions, addTransaction, editTransaction, deleteTransaction, loading, setLoading
        }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export default TransactionsProvider;

