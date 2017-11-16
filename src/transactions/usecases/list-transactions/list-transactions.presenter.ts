import { ListTransactionsModels } from "./list-transactions.models";

export interface IListTransactionsPresenter {
  viewmodel: ListTransactionsModels.ViewModel;
  present(responseModel: ListTransactionsModels.ResponseModel);
}

export class ListTransactionsPresenter implements IListTransactionsPresenter {
  viewmodel: ListTransactionsModels.ViewModel;
  present(responseModel: ListTransactionsModels.ResponseModel) {
    throw new Error("Method not implemented.");
  }
}