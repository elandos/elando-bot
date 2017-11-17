import { IListTransactionsInteractor } from "../../transactions/usecases/list-transactions/list-transactions.interactor";
import { IListTransactionsPresenter } from "../../transactions/usecases/list-transactions/list-transactions.presenter";
import { IAccountsRepository } from "../../accounts/shared/accounts.repository";
import { CallbackIds } from "../shared/callback-ids";

var debug = require('debug')('botkit:hears');
/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

interface Dependencies {
    listTransactionsInteractor: IListTransactionsInteractor;
    listTransactionsPresenter: IListTransactionsPresenter;
    accountsRepository: IAccountsRepository;
}

export function setupHearsSkill(controller, deps: Dependencies) {

    const {
        accountsRepository,
        listTransactionsInteractor,
        listTransactionsPresenter,
    } = deps;

    controller.hears(['^hi', '^hello'], 'direct_message,direct_mention', function (bot, message) {
        debug("hi message", message);
        bot.reply(message, {
            attachments: [{
                title: 'May I help you?',
                callback_id: CallbackIds.SHOW_MENU,
                attachment_type: 'default',
                actions: [{
                    "name": "create",
                    "text": "Create Account",
                    "value": "create",
                    "type": "button",
                },
                {
                    "name": "no",
                    "text": "No Thanks",
                    "value": "no",
                    "type": "button",
                }]
            }]
        });
    });

    controller.hears(['list.*transactions', 'show.*transactions', 'what.*transactions'], 'direct_message,direct_mention', function (bot, message) {

        debug("received message:", message);
        accountsRepository.findAccountById(message.user)
            .then(account => {

                return listTransactionsInteractor.listAll({
                    address: account.address,
                }, listTransactionsPresenter);

            })
            .then(() => {
                debug("presenter", listTransactionsPresenter.viewmodel);
                bot.whisper(message, listTransactionsPresenter.viewmodel.text);
            });

    });

};