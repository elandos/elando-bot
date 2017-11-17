import { CreateAccountRequestModels } from "./create-account-request.models";


export interface ICreateAccountRequestPresenter {
  viewmodel: CreateAccountRequestModels.ViewModel;
  present();
}

export class CreateAccountRequestPresenter implements ICreateAccountRequestPresenter {
  viewmodel: CreateAccountRequestModels.ViewModel;
  present() {
    this.viewmodel = {
      dialog: {
        title: 'Create Account',
        submitLabel: 'Submit',
      },
      passwordTextField: {
        label: 'Password',
        name: 'password',
        value: '',
        opts: {
          placeholder: 'Password for Ethereum account',
        }
      },
      confirmTextField: {
        label: 'Confirm Password',
        name: 'confirm_password',
        value: '',
        opts: {
          placeholder: 'Confirm password',
        }
      }
    }
  }

}