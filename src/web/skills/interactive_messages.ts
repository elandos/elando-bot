import { ICreateAccountRequestInteractor } from "../../accounts/usecases/create-account-request/create-account-request.interactor";
import { ICreateAccountRequestPresenter } from "../../accounts/usecases/create-account-request/create-account-request.presenter";
import { CallbackIds } from "../shared/callback-ids";

var debug = require('debug')('botkit:interactive_messages');

interface Dependencies {
    createAccountRequestInteractor: ICreateAccountRequestInteractor;
    createAccountRequestPresenter: ICreateAccountRequestPresenter;
}

export function setupInteractiveMessagesSkill(controller, deps: Dependencies) {

    const { createAccountRequestInteractor, createAccountRequestPresenter } = deps;

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

            // const {
            //     dialog: d,
            //     passwordTextField: ptf,
            //     confirmTextField: ctf,
            // } = createAccountRequestPresenter.viewmodel;
            const userId = trigger.actions[0].value
            const userIdTemplate = `<@${userId}>`

            var dialog = bot.createDialog(
                'Transaction',
                CallbackIds.SUBMIT_TRANSACTION,
                'Submit',
            ).addSelect('To(Cannot be changed)', 'to', userId, [{ label: userId, value: userId }], null)
                .addNumber('Amount', 'amount', '', {
                    placeholder: 'Amount to send',
                })
                .addText('Password', 'password', '', {
                    placeholder: 'Password for Ethereum account',
                });

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