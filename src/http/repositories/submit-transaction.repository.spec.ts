import { expect } from "chai";
import { SubmitTransactionRepository } from "./submit-transaction.repository";

describe("SubmitTransactionRepository", () => {
  describe("sendTransaction", () => {
    it("Should successfully create an account", () => {
      // FIXME: not a valid test

      const repository = new SubmitTransactionRepository("http://localhost:8080/function/send-transaction");

      repository.sendTransaction("0x3e0d99e1a3e53387f210e07f3a2ef77034a66b24", "0xe61a080fe7455249ffc68151f6ede3746d450179", "100")
        .then(res => {
          console.log(res);
        })

    });
  })
});