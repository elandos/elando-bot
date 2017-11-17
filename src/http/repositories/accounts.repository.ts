var debug = require("debug")("accounts.repository:");
import { RedisClient } from "redis";

import { Account } from "../../accounts/entities/account";
import { IAccountsRepository } from "../../accounts/shared/accounts.repository";

export class AccountsRepository implements IAccountsRepository {
  constructor(private redisClient: RedisClient) { }

  findAccountById(id: string): Promise<Account> {
    return new Promise((resolve, reject) => {

      this.redisClient.get(id, (err, reply) => {
        if (err) {
          reject(err);
        }

        if (reply == null) {
          reject(new Error("account not found"));
        }

        debug("redis reply:", reply);
        resolve({
          address: reply,
        })

      });

    });
  }
}