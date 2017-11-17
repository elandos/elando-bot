import * as request from 'request';
import { RedisClient } from 'redis';
var debug = require('debug')('submit-account.repository:');

import { ISubmitAccountRepository } from "../../accounts/usecases/submit-account/submit-account.types";
import { Account } from '../../accounts/entities/account';

interface CreateAccountResponse {
  data: {
    address: string;
  }
}

// TODO: handle errors
export class SubmitAccountRepository implements ISubmitAccountRepository {

  constructor(private ethEndpoint: string, private redisClient: RedisClient) {
  }

  createAccount(userId: string, password: string): Promise<Account> {
    // TODO: throw error if userId already exists

    return new Promise((resolve, reject) => {
      this.saveToEthereum(password)
        .then(account => {
          return this.saveToRedis(userId, account.address)
            .then(res => {
              debug("redis response", res);
              return account;
            });
        })
        .then(account => {
          resolve(account);
        });
    })

  }

  private saveToEthereum(password: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      const opts: request.CoreOptions = {
        json: true,
        body: {
          password,
        }
      };

      request.post(this.ethEndpoint, opts, (err, response, body) => {
        const { data: {
          address
        } } = body as CreateAccountResponse;

        resolve({ address });
      });
    })

  }

  private saveToRedis(userId: string, address: string): Promise<any> {
    return new Promise((resolve, reject) => {

      this.redisClient.set(userId, address, (err, res) => {
        console.log("redis err", err);
        console.log("redis res", res);

        if (err) {
          reject(err);
        }
        resolve(res);
      });

    });
  }

}