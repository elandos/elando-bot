import { Account } from "../../entities/account";

export interface ISubmitAccountRepository {
  createAccount(userId: string, password: string): Promise<Account>;
}