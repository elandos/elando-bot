import * as request from 'request';
var debug = require('debug')('submit-account.repository:');

import { ISubmitTransactionRepository } from "../../transactions/usecases/submit-transaction/submit-transaction.types";
import { Transaction } from "../../transactions/entities/transaction";

interface SubmitTransactionResponse {
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
  };
}

export class SubmitTransactionRepository implements ISubmitTransactionRepository {

  constructor(private ethEndpoint: string) { }

  sendTransaction(from: string, to: string, value: string): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      const opts: request.CoreOptions = {
        json: true,
        body: {
          from,
          to,
          value,
        }
      };

      request.post(this.ethEndpoint, opts, (err, response, body) => {
        const { data } = body as SubmitTransactionResponse;

        resolve({
          hash: data.hash,
          nonce: data.nonce,
          blockHash: data.blockHash,
          blockNumber: data.blockNumber,
          transactionIndex: data.transactionIndex,
          from: data.from,
          to: data.to,
          value: data.value,
          gas: data.gas,
          gasPrice: data.gasPrice,
          input: data.input,
        });
      });
    })
  }
}