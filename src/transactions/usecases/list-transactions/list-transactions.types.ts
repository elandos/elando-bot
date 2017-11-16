import { Transaction } from "../../entities/transaction";

export interface IListTransactionsRepository {
  findAllTransactionsByAddress(address: string): Promise<Transaction[]>;
}