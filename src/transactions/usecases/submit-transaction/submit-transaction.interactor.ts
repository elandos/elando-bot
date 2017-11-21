import { SubmitTransactionModels } from "./submit-transaction.models";
import { SubmitTransactionPresenter } from "./submit-transaction.presenter";
import { ISubmitTransactionRepository } from "./submit-transaction.types";

export interface ISubmitTransactionInteractor {
  submit(requestModel: SubmitTransactionModels.RequestModel, presenter: SubmitTransactionPresenter): Promise<any>;
}

export class SubmitTransactionInteractor implements ISubmitTransactionInteractor {

  constructor(private repository: ISubmitTransactionRepository) { }

  submit(requestModel: SubmitTransactionModels.RequestModel, presenter: SubmitTransactionPresenter): Promise<any> {
    return new Promise((resolve, reject) => {
      const {
        from,
        to,
        value,
       } = requestModel;

      this.repository.sendTransaction(from, to, value)
        .then(t => {
          presenter.present({
            transaction: t,
          });
          resolve();
        })
    });
  }
}