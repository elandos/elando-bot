import { ValidateAccountSubmissionModels } from "./validate-account-submission.models";
import { IValidateAccountSubmissionPresenter } from "./validate-account-submission.presenter";

export interface IValidateAccountSubmissionInteractor {
  validate(requestModel: ValidateAccountSubmissionModels.RequestModel, presenter: IValidateAccountSubmissionPresenter): void;
}

export class ValidateAccountSubmissionInteractor implements IValidateAccountSubmissionInteractor {
  validate(requestModel: ValidateAccountSubmissionModels.RequestModel, presenter: IValidateAccountSubmissionPresenter): void {
    throw new Error("Method not implemented.");
  }
}