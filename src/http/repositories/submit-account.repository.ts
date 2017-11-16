import * as request from 'request';
var debug = require('debug')('submit-account.repository:');

import { ISubmitAccountRepository } from "../../accounts/usecases/submit-account/submit-account.types";
import { Account } from '../../accounts/entities/account';

interface CreateAccountResponse {
  data: {
    address: string;
  }
}

export class SubmitAccountRepository implements ISubmitAccountRepository {

  constructor(private endpoint: string) { }

  createAccount(password: string): Promise<Account> {

    return new Promise((resolve, reject) => {
      const opts: request.CoreOptions = {
        json: true,
        body: {
          password,
        }
      };

      debug('endpoint', this.endpoint);
      debug('password', password);
      request.post(this.endpoint, opts, (err, response, body) => {
        debug("error", err);
        debug("response", response);
        const { data: {
          address
        } } = body as CreateAccountResponse;

        resolve({ address });
      });

    })

  }

}