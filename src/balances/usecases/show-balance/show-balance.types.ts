import { Balance } from "../../entities/balance";

export interface IShowBalanceRepository {
  findBalanceByAddress(address: string): Promise<Balance>;
}