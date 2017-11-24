import { Transaction } from "../../entities/transaction";

export interface ISubmitTransactionRepository {
  sendTransaction(from: string, to: string, value: string): Promise<Transaction>;
}