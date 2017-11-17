import { expect } from "chai";
import { SubmitAccountRepository } from "./submit-account.repository";

import * as redis from "redis";
import { ListTransactionsRepository } from "./list-transactions.repository";

describe("ListTransactionsRepository", () => {
  describe("findAllTransactionsByAddress", () => {
    it("Should successfully get transactions", () => {
      // FIXME: not a valid test

      const redisClient = redis.createClient({
        host: "localhost",
      });
      const repository = new ListTransactionsRepository("http://localhost:8080/function/get-transactions");

      repository.findAllTransactionsByAddress("0x8d8335117fd973ed82004c182d8c71c250866390")
        .then(res => {
          console.log(res);

          redisClient.quit()
        });

    });
  })
});