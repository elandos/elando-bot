import { SendTransactionRequestModels } from "./send-transaction-request.models";

export interface ISendTransactionRequestPresenter {
  viewmodel: SendTransactionRequestModels.ViewModel;
  present(responseModel: SendTransactionRequestModels.ResponseModel): void;
}

export class SendTransactionRequestPresenter implements ISendTransactionRequestPresenter {
  viewmodel: SendTransactionRequestModels.ViewModel;
  present(responseModel: SendTransactionRequestModels.ResponseModel): void {
    const { userId } = responseModel;
    this.viewmodel = {
      dialog: {
        title: 'Transaction',
        submitLabel: 'Submit',
      },
      userSelectField: {
        label: 'To(Cannot be changed)',
        name: 'to',
        value: userId,
        optionList: [{ label: userId, value: userId }],
      },
      ammountTextField: {
        label: 'Amount',
        name: 'amount',
        value: '',
        opts: {
          placeholder: 'Amount to send',
        }
      },
      passwordTextField: {
        label: 'Password',
        name: 'password',
        value: '',
        opts: {
          placeholder: 'Password for Ethereum account',
        }
      }
    }
  }

}