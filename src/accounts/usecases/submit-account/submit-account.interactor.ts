import { SubmitAccountModels } from "./submit-account.models";
import { ISubmitAccountPresenter } from "./submit-account.presenter";
import { ISubmitAccountRepository } from "./submit-account.types";

export interface ISubmitAccountInteractor {
  submit(requestModel: SubmitAccountModels.RequestModel, presenter: ISubmitAccountPresenter): Promise<any>;
}

export class SubmitAccountInteractor implements ISubmitAccountInteractor {

  constructor(private repository: ISubmitAccountRepository) { }

  submit(requestModel: SubmitAccountModels.RequestModel, presenter: ISubmitAccountPresenter): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.createAccount(requestModel.password)
        .then(res => {
          const responseModel: SubmitAccountModels.ResponseModel = {
            address: res.address,
          };

          presenter.present(responseModel);
          resolve();
        })
    });
  }
}