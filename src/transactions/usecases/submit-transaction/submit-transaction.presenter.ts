import { SubmitTransactionModels } from "./submit-transaction.models";

export interface ISubmitTransactionPresenter {
  viewmodel: SubmitTransactionModels.ViewModel;
  present(responseModel: SubmitTransactionModels.ResponseModel): void;
}

export class SubmitTransactionPresenter implements ISubmitTransactionPresenter {
  viewmodel: SubmitTransactionModels.ViewModel;

  present(responseModel: SubmitTransactionModels.ResponseModel): void {
    this.viewmodel = {
      transaction: responseModel.transaction,
    };
  }
}