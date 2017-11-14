import { ICreateAccountRequestPresenter } from "./create-account-request.presenter";

export interface ICreateAccountRequestInteractor {
  createResponse(presenter: ICreateAccountRequestPresenter): void;
}

export class CreateAccountRequestInteractor implements ICreateAccountRequestInteractor {
  createResponse(presenter: ICreateAccountRequestPresenter) {
    
    presenter.present();
  }

}