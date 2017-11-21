import { ICreateAccountRequestInteractor } from "../../accounts/usecases/create-account-request/create-account-request.interactor";
import { ICreateAccountRequestPresenter } from "../../accounts/usecases/create-account-request/create-account-request.presenter";
import { CallbackIds } from "../shared/callback-ids";
import { ISendTransactionRequestInteractor } from "../../transactions/usecases/send-transaction-request/send-transaction-request.interactor";
import { ISendTransactionRequestPresenter } from "../../transactions/usecases/send-transaction-request/send-transaction-request.presenter";
import { IAccountsRepository } from "../../accounts/shared/accounts.repository";
import { IListTransactionsInteractor } from "../../transactions/usecases/list-transactions/list-transactions.interactor";
import { IListTransactionsPresenter } from "../../transactions/usecases/list-transactions/list-transactions.presenter";

var debug = require('debug')('botkit:slash_command');

interface Dependencies {
    accountsRepository: IAccountsRepository;
    createAccountRequestInteractor: ICreateAccountRequestInteractor;
    createAccountRequestPresenter: ICreateAccountRequestPresenter;
    listTransactionsInteractor: IListTransactionsInteractor;
    listTransactionsPresenter: IListTransactionsPresenter;
}

export function setupSlashCommandSkill(controller, deps: Dependencies) {

    // slash command handler
    controller.on('slash_command', function (bot, message) {
        debug('slash command:', message);
        switch (message.command) {
            case '/createaccount':
                handleCreateAccount(bot, message, deps);
                break;
            case '/showtransactions':
                handleShowTransactions(bot, message, deps);
                break;
            case '/sendto':
                handleSendTo(bot, message, deps);
                break;
            default:
                break;
        }
    });
}

function handleCreateAccount(bot: any, message: any, deps: Dependencies) {
    const {
        createAccountRequestInteractor,
        createAccountRequestPresenter,
    } = deps;

    createAccountRequestInteractor.createResponse(createAccountRequestPresenter);
    const {
        dialog: d,
        passwordTextField: ptf,
        confirmTextField: ctf,
    } = createAccountRequestPresenter.viewmodel;

    var dialog = bot.createDialog(
        d.title,
        CallbackIds.SUBMIT_ACCOUNT,
        d.submitLabel,
    ).addText(ptf.label, ptf.name, ptf.value, ptf.opts)
        .addText(ctf.label, ctf.name, ctf.value, ctf.opts)

    bot.replyWithDialog(message, dialog.asObject(), function (err, res) {
        debug('replyWithDialog response:', res);
        // TODO: handle your errors!
    });
}

function handleShowTransactions(bot: any, message: any, deps: Dependencies) {
    const {
        accountsRepository,
        listTransactionsInteractor,
        listTransactionsPresenter
    } = deps;

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
}

function handleSendTo(bot: any, message: any, deps: Dependencies) {
    const targetId = message.text.match('<@([a-zA-Z0-9]*)')[1]
    bot.reply(message, {
        attachments: [{
            title: `Do you want to send <@${targetId}>(User ID: ${targetId}) eth?`,
            callback_id: CallbackIds.SHOW_MENU_FOR_TRANSACTION,
            attachment_type: 'default',
            actions: [{
                "name": "yes",
                "text": "Yes",
                "value": targetId,
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
}