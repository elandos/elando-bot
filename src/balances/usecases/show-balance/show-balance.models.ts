import { Balance } from "../../entities/balance";

export namespace ShowBalanceModels {
  export interface RequestModel {
    address: string;
  }

  export interface ResponseModel {
    balance: Balance;
  }

  export interface ViewModel {
    text: string;
  }

}