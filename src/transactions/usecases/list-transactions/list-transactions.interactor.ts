import { ListTransactionsModels } from "./list-transactions.models";
import { IListTransactionsPresenter } from "./list-transactions.presenter";
import { IListTransactionsRepository } from "./list-transactions.types";
import { Transaction } from "../../entities/transaction";

export interface IListTransactionsInteractor {
  listAll(requestModel: ListTransactionsModels.RequestModel, presenter: IListTransactionsPresenter): Promise<any>;
}

export class ListTransactionsInteractor implements IListTransactionsInteractor {

  constructor(private repository: IListTransactionsRepository) { }

  listAll(requestModel: ListTransactionsModels.RequestModel, presenter: IListTransactionsPresenter): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.findAllTransactionsByAddress(requestModel.address)
        .then(transactions => {
          const responseModel: ListTransactionsModels.ResponseModel = {
            transactions: transactions,
          };

          presenter.present(responseModel);
          resolve();

          // TODO: add reject cases
        });
    });
  }
}
