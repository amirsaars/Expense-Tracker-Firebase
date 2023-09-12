import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransactions = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userId: userID,
      description: description,
      transactionAmount: transactionAmount,
      transactionType: transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
