import { Account } from "../entities/account";

export interface IAccountsRepository {
  findAccountById(id: string): Promise<Account>
}
