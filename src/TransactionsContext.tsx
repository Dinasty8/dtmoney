import { createContext, useEffect, useState ,ReactNode} from "react";
import { api } from "./services/api";

interface Transaction {
  id:string;
  title:string;
  amount:number;
  type:string;
  category:string;
  createdAt:string;
}

interface TransactionsProviderProps{
  children:ReactNode;
}
export const TransactionsContext = createContext<Transaction[]>([]);

export function TransactionsProvider({children}:TransactionsProviderProps){
  const[transactions,setTransactions] =useState<Transaction[]>([]);
  useEffect(() => {
    // barra '/' antes de transactions é opcional
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))//informações vindo de um objeto data onde tem uma array transactions
  },[]);

  return(
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
}