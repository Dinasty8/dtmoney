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

type TransactionInput = Omit<Transaction,'id' | 'createdAt'>;
// poderia ser type TransactionInput = Pick<Transaction,'title' | 'amount' | 'type' | 'category'>;

interface TransactionsProviderProps{
  children:ReactNode;
}

interface TransactionsContextData{
  transactions:Transaction[];
  createTransaction:(transaction:TransactionInput) => void;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData //(enganando o typescript) esse objeto tem o tipo que eu quero mesmo deixa de reclamar kk
  );

export function TransactionsProvider({children}:TransactionsProviderProps){
  const[transactions,setTransactions] =useState<Transaction[]>([]);
  useEffect(() => {
    // barra '/' antes de transactions é opcional
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))//informações vindo de um objeto data onde tem uma array transactions
  },[]);

  function createTransaction(transaction:TransactionInput){
    api.post('/transactions',transaction)
  }

  return(
    <TransactionsContext.Provider value={{transactions,createTransaction}}> 
      {children}
    </TransactionsContext.Provider>
  )
}