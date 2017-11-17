import { expect } from "chai";
import { SubmitAccountRepository } from "./submit-account.repository";

import * as redis from "redis";
import { AccountsRepository } from "./accounts.repository";

describe("AccountsRepository", () => {
  describe("findAccountById", () => {
    it("Should successfully fin an account", () => {
      // FIXME: not a valid test

      const redisClient = redis.createClient({
        host: "localhost",
      });
      const repository = new AccountsRepository(redisClient);

      repository.findAccountById("testuser")
        .then(res => {
          console.log(res);

          redisClient.quit()
        }).catch(console.log)

    });
  })
});