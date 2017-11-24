import { ISendTransactionRequestPresenter } from "./send-transaction-request.presenter";
import { SendTransactionRequestModels } from "./send-transaction-request.models";

export interface ISendTransactionRequestInteractor {
  createResponse(requestModel: SendTransactionRequestModels.RequestModel, presenter: ISendTransactionRequestPresenter): void;
}

export class SendTransactionRequestInteractor implements ISendTransactionRequestInteractor {
  createResponse(requestModel: SendTransactionRequestModels.RequestModel, presenter: ISendTransactionRequestPresenter): void {

    presenter.present({
      userId: requestModel.userId,
    });
  }

}