import { ShowBalanceModels } from "./show-balance.models";

export interface IShowBalancePresenter {
  viewmodel: ShowBalanceModels.ViewModel;
  present(responseModel: ShowBalanceModels.ResponseModel): void;
}

export class ShowBalancePresenter implements IShowBalancePresenter {
  viewmodel: ShowBalanceModels.ViewModel;

  present(responseModel: ShowBalanceModels.ResponseModel): void {
    const text = JSON.stringify(responseModel.balance);
    this.viewmodel = {
      text,
    }
  }

}