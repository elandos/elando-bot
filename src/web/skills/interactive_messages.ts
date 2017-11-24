import { ICreateAccountRequestInteractor } from "../../accounts/usecases/create-account-request/create-account-request.interactor";
import { ICreateAccountRequestPresenter } from "../../accounts/usecases/create-account-request/create-account-request.presenter";
import { CallbackIds } from "../shared/callback-ids";
import { ISendTransactionRequestInteractor } from "../../transactions/usecases/send-transaction-request/send-transaction-request.interactor";
import { ISendTransactionRequestPresenter } from "../../transactions/usecases/send-transaction-request/send-transaction-request.presenter";

var debug = require('debug')('botkit:interactive_messages');

interface Dependencies {
    createAccountRequestInteractor: ICreateAccountRequestInteractor;
    createAccountRequestPresenter: ICreateAccountRequestPresenter;
    sendTransactionRequestInteractor: ISendTransactionRequestInteractor,
    sendTransactionRequestPresenter: ISendTransactionRequestPresenter,
}

export function setupInteractiveMessagesSkill(controller, deps: Dependencies) {

    const {
        createAccountRequestInteractor,
        createAccountRequestPresenter,
        sendTransactionRequestInteractor,
        sendTransactionRequestPresenter,
        } = deps;

    // launch a dialog from a button click
    controller.on('interactive_message_callback', function (bot, trigger) {
        debug('interactive message callback:', trigger);
        // is the name of the clicked button "dialog?"
        // TODO: Fix matching word
        if (trigger.callback_id === CallbackIds.SHOW_MENU && trigger.actions[0].name.match(/^create/)) {
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

            bot.replyWithDialog(trigger, dialog.asObject(), function (err, res) {
                debug('replyWithDialog response:', res);
                // TODO: handle your errors!
            });

        } else if (trigger.callback_id === CallbackIds.SHOW_MENU_FOR_TRANSACTION &&
            trigger.actions[0].name.match(/^yes/)) {

            // TODO: error handling
            const userId: string = trigger.actions[0].value
            sendTransactionRequestInteractor.createResponse({
                userId,
            }, sendTransactionRequestPresenter);

            const {
                dialog: d,
                userSelectField: usf,
                ammountTextField: atf,
                passwordTextField: ptf,
            } = sendTransactionRequestPresenter.viewmodel;

            var dialog = bot.createDialog(
                d.title,
                CallbackIds.SUBMIT_TRANSACTION,
                d.submitLabel,
            ).addSelect(usf.label, usf.name, usf.value, usf.optionList, null)
                .addNumber(atf.label, atf.name, atf.value, atf.opts)
                .addText(ptf.label, ptf.name, ptf.value, ptf.opts);

            bot.replyWithDialog(trigger, dialog.asObject(), function (err, res) {
                debug('replyWithDialog response:', res);
                // TODO: handle your errors!
            });

        }

    });

    // // create special handlers for certain actions in buttons
    // // if the button action is 'say', act as if user said that thing
    // controller.middleware.receive.use(function (bot, message, next) {
    //     if (message.type == 'interactive_message_callback') {
    //         if (message.actions[0].name.match(/^say$/)) {
    //             var reply = message.original_message;

    //             for (var a = 0; a < reply.attachments.length; a++) {
    //                 reply.attachments[a].actions = null;
    //             }

    //             var person = '<@' + message.user + '>';
    //             if (message.channel[0] == 'D') {
    //                 person = 'You';
    //             }

    //             reply.attachments.push({
    //                 text: person + ' said, ' + message.actions[0].value,
    //             });

    //             bot.replyInteractive(message, reply);

    //         }
    //     }

    //     next();

    // });

}