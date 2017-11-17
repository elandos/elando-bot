import { expect } from "chai";
import { SubmitAccountRepository } from "./submit-account.repository";

import * as redis from "redis";

describe("SubmitAccountRepository", () => {
  describe("createAccount", () => {
    it("Should successfully create an account", () => {
      // FIXME: not a valid test

      const redisClient = redis.createClient({
        host: "localhost",
      });
      const repository = new SubmitAccountRepository("http://localhost:8080/function/new-account", redisClient);

      repository.createAccount("testuser", "testaddress")
        .then(res => {
          console.log(res);

          redisClient.quit()
        })

    });
  })
});