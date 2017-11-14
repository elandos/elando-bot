import { SubmitAccountModels } from "./submit-account.models";

export interface ISubmitAccountPresenter {
  viewmodel: SubmitAccountModels.ViewModel;
  present(responseModel: SubmitAccountModels.ResponseModel): void;
}

export class SubmitAccountPresenter implements ISubmitAccountPresenter {
  viewmodel: SubmitAccountModels.ViewModel;
  present(responseModel: SubmitAccountModels.ResponseModel): void {
    throw new Error("Method not implemented.");
  }

}