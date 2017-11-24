import { ShowBalanceModels } from "./show-balance.models";
import { IShowBalancePresenter } from "./show-balance.presenter";
import { IShowBalanceRepository } from "./show-balance.types";

export interface IShowBalanceInteractor {
  get(requestModel: ShowBalanceModels.RequestModel, presenter: IShowBalancePresenter): Promise<any>;
}

export class ShowBalanceInteractor implements IShowBalanceInteractor {

  constructor(private repository: IShowBalanceRepository) { }

  get(requestModel: ShowBalanceModels.RequestModel, presenter: IShowBalancePresenter): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.findBalanceByAddress(requestModel.address)
        .then(v => {
          const responseModel = {
            balance: v,
          } as ShowBalanceModels.ResponseModel;

          presenter.present(responseModel);

          resolve();
        });
    });
  }
}