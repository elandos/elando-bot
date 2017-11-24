export namespace SendTransactionRequestModels {
  export interface RequestModel {
    userId: string;
  }

  export interface ResponseModel {
    userId: string;
  }

  export interface ViewModel {
    dialog: {
      title: string;
      submitLabel: string;
    }

    userSelectField: {
      label: string;
      name: string;
      value: string;
      optionList: { label: string, value: string }[],
    }

    ammountTextField: {
      label: string;
      name: string;
      value: string;
      opts: {
        placeholder: string;
      }
    }

    passwordTextField: {
      label: string;
      name: string;
      value: string;
      opts: {
        placeholder: string;
      }
    }
  }
}