import { expect } from "chai";

import { ShowBalanceRepository } from "./show-balance.repository";

describe("ShowBalanceRepository", () => {
  describe("findBalanceByAddress", () => {
    it("Should successfully get balance", () => {
      // FIXME: not a valid test

      const repository = new ShowBalanceRepository("http://localhost:8080/function/get-balance");

      repository.findBalanceByAddress("0x876cdb71c292cc7a713abb2d0769ffe6b4188582")
        .then(res => {
          console.log(res);
        });

    });
  })
});