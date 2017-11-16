import { Account } from "../../entities/account";

export interface ISubmitAccountRepository {
  createAccount(password: string): Promise<Account>;
}