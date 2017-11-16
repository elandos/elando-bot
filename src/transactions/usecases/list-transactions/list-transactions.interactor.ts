import { ListTransactionsModels } from "./list-transactions.models";
import { IListTransactionsPresenter } from "./list-transactions.presenter";

export interface IListTransactionsInteractor {
  listAll(requestModel: ListTransactionsModels.RequestModel, presenter: IListTransactionsPresenter): Promise<any>;
}

export class ListTransactionsInteractor implements IListTransactionsInteractor {
  listAll(requestModel: ListTransactionsModels.RequestModel, presenter: IListTransactionsPresenter): Promise<any> {
    throw new Error("Method not implemented.");
  }

}