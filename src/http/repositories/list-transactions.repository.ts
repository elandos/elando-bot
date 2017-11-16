import * as request from 'request';
var debug = require('debug')('submit-account.repository:');

import { IListTransactionsRepository } from "../../transactions/usecases/list-transactions/list-transactions.types";
import { Transaction } from "../../transactions/entities/transaction";


interface ListTransactionsResponse {
  data: {
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

export class ListTransactionsRepository implements IListTransactionsRepository {
  findAllTransactionsByAddress(address: string): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }
}