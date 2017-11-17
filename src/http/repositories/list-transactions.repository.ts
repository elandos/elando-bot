import * as request from "request";
var debug = require("debug")("submit-account.repository:");

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
  }[];
}

export class ListTransactionsRepository implements IListTransactionsRepository {

  constructor(private ethEndpoint: string) { }

  findAllTransactionsByAddress(address: string): Promise<Transaction[]> {
    debug("findAllTransactionsByAddress:", address);
    return this.findTransactions(address);
  }

  private findTransactions(address: string): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      const opts: request.CoreOptions = {
        json: true,
        body: {
          address,
        }
      };

      debug("ethEndpoint:", this.ethEndpoint);
      request.post(this.ethEndpoint, opts, (err, response, body) => {
        if (err) {
          reject(err);
        }

        debug("response", response);
        debug("body", body);
        const { data } = body as ListTransactionsResponse;

        const transactions = data.map(d => {
          return {
            hash: d.hash,
            nonce: d.nonce,
            blockHash: d.blockHash,
            blockNumber: d.blockNumber,
            transactionIndex: d.transactionIndex,
            from: d.from,
            to: d.to,
            value: d.value,
            gas: d.gas,
            gasPrice: d.gasPrice,
            input: d.input,
          }
        });

        resolve(transactions);
      });
    });

  }
}