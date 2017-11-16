export namespace SubmitAccountModels {
  export interface RequestModel {
    password: string;
  }

  export interface ResponseModel {
    address: string;
  }

  export interface ViewableAccount {
    address: string;
  }

  export interface ViewModel {
    viewableAccount: ViewableAccount;
  }
}