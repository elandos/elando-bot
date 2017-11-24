import { Transaction } from "../../entities/transaction";

export namespace SubmitTransactionModels {
  export interface RequestModel {
    from: string;
    to: string;
    value: string;
  }

  export interface ResponseModel {
    transaction: Transaction;
  }

  export interface ViewModel {
    transaction: ViewableTransaction;
  }

  export interface ViewableTransaction {
    hash: string;
    nonce: number;
    blockHash: string;
    blockNumber: number;
    transactionIndex: number;
    from: string;
    to: string;
    value: string;
    gas: number;
    gasPrice: string;
    input: string;
  }
}