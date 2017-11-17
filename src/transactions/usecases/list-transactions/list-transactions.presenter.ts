import { ListTransactionsModels } from "./list-transactions.models";
import { Transaction } from "../../entities/transaction";

export interface IListTransactionsPresenter {
  viewmodel: ListTransactionsModels.ViewModel;
  present(responseModel: ListTransactionsModels.ResponseModel);
}

export class ListTransactionsPresenter implements IListTransactionsPresenter {
  viewmodel: ListTransactionsModels.ViewModel;
  present(responseModel: ListTransactionsModels.ResponseModel) {
    const viewableTransactions = this.makeViewableTransactions(responseModel.transactions);

    let msg = "";
    if (viewableTransactions.length === 0) {
      msg = "It looks like you don't have any transactions.";
    } else {
      msg = "Here are your transactions:\n";
      viewableTransactions.forEach(t => {
        msg += `${JSON.stringify(t)}\n`
      });
    }
    this.viewmodel = {
      text: msg,
      transactions: viewableTransactions,
    };
  }

  private makeViewableTransactions(transactions: Transaction[]): ListTransactionsModels.ViewableTransaction[] {
    return transactions.map(t => {
      return {
        hash: t.hash,
        nonce: t.nonce,
        blockHash: t.blockHash,
        blockNumber: t.blockNumber,
        transactionIndex: t.transactionIndex,
        from: t.from,
        to: t.to,
        value: t.value,
        gas: t.gas,
        gasPrice: t.gasPrice,
        input: t.input,
      };
    });
  }
}