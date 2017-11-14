export namespace CreateAccountRequestModels {
  export interface ViewModel {
    dialog: {
      title: string;
      callbackId: string;
      submitLabel: string;
    }

    passwordTextField: {
      label: string;
      name: string;
      value: string;
      opts: {
        placeholder: string;
      }
    }

    confirmTextField: {
      label: string;
      name: string;
      value: string;
      opts: {
        placeholder: string;
      }
    }
  }
}