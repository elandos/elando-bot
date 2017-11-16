import { expect } from "chai";
import { SubmitAccountRepository } from "./submit-account.repository";

describe("SubmitAccountRepository", () => {
  describe("createAccount", () => {
    it("Should successfully create an account", () => {
      // FIXME: not a valid test
      const repository = new SubmitAccountRepository("http://localhost:8080/function/new-account");

      repository.createAccount("test")
        .then(res => {
          console.log(res);
        })

    });
  })
});