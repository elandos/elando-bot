import { Transaction } from "../../entities/transaction";

export namespace ListTransactionsModels {
  export interface RequestModel {
    address: string;
  }

  export interface ResponseModel {
    transactions: Transaction[];
  }

  export interface ViewModel {
    text: string;
    transactions: ViewableTransaction[];
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