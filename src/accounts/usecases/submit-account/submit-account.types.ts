export interface ISubmitAccountRepository {
  createAccount(password: string): Promise<any>;
}