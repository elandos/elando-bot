export namespace SubmitAccountModels {
  export interface RequestModel {
    userId: string;
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