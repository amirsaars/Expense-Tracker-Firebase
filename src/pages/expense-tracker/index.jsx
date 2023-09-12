import { useState, useEffect } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import "./styles.css";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransactions();
  const {
    transactions,
    transactionTotals: { balance, income, expense },
  } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description: description,
      transactionAmount: transactionAmount,
      transactionType: transactionType,
    });
    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name} Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>{balance >= 0 ? `$${balance}` : `-$${Math.abs(balance)}`}</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expense}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              required
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              placeholder="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">income</label>
            <button>Add transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img
              className="profile-photo"
              src={profilePhoto}
              alt="profilePhoto"
            />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>TransActions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={description}>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
