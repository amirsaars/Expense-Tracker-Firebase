import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    const queryTransactions = query(
      transactionCollectionRef,
      where("userId", "==", userID),
      orderBy("createdAt")
    );

    onSnapshot(queryTransactions, (snapshot) => {
      const docs = [];
      let totalIncome = 0;
      let totalExpense = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        docs.push({ ...data, id });

        if (data.transactionType === "expense") {
          totalExpense += Number(data.transactionAmount);
        } else {
          totalIncome += Number(data.transactionAmount);
        }
      });
      setTransactions(docs);
      setTransactionTotals({
        balance: totalIncome - totalExpense,
        income: totalIncome,
        expense: totalExpense,
      });
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};
