import { ISubmitAccountInteractor, SubmitAccountInteractor } from "../../accounts/usecases/submit-account/submit-account.interactor";
import { ISubmitAccountPresenter } from "../../accounts/usecases/submit-account/submit-account.presenter";
import { SubmitAccountModels } from "../../accounts/usecases/submit-account/submit-account.models";
import { CallbackIds } from "../shared/callback-ids";

var debug = require('debug')('botkit:dialog_submissions');

interface Dependencies {
    submitAccountInteractor: ISubmitAccountInteractor,
    submitAccountPresenter: ISubmitAccountPresenter,
}

export function setupDialogSubmissionSkill(controller, deps: Dependencies) {
    const { submitAccountInteractor, submitAccountPresenter } = deps;
    // use a receive middleware hook to validate a form submission
    // and use bot.dialogError to respond with an error before the submission
    // can be sent to the handler
    controller.middleware.receive.use(function validateDialog(bot, message, next) {

        // TODO: validate request

        // if (message.type == 'dialog_submission') {

        //     if (message.submission.number > 100) {
        //         bot.dialogError({
        //             "name": "number",
        //             "error": "Please specify a value below 100"
        //         });
        //         return;
        //     }
        // }

        next();

    });


    // handle a dialog submission
    // the values from the form are in event.submission    
    controller.on('dialog_submission', function (bot, message) {
        debug('dialog submission message:', message);

        // call dialogOk or else Slack will think this is an error
        bot.dialogOk();

        // TODO: need validation
        var submission = message.submission;

        if (message.callback_id === CallbackIds.SUBMIT_ACCOUNT) {
            const requestModel: SubmitAccountModels.RequestModel = {
                userId: message.user,
                password: submission.password,
            };
            debug('requestModel', requestModel);
            submitAccountInteractor.submit(requestModel, submitAccountPresenter)
                .then(() => {
                    // TODO: format message
                    bot.whisper(message, submitAccountPresenter.viewmodel.viewableAccount.address);
                });
        }

    });
}