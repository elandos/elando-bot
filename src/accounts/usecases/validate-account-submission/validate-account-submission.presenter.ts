import { ValidateAccountSubmissionModels } from "./validate-account-submission.models";

export interface IValidateAccountSubmissionPresenter {
  viewmodel: ValidateAccountSubmissionModels.ViewModel;
  present(responseModel: ValidateAccountSubmissionModels.ResponseModel): void;
}

export class ValidateAccountSubmissionPresenter implements IValidateAccountSubmissionPresenter {
  viewmodel: ValidateAccountSubmissionModels.ViewModel;
  present(responseModel: ValidateAccountSubmissionModels.ResponseModel): void {
    throw new Error("Method not implemented.");
  }

}