import * as request from 'request';

import { ISubmitAccountRepository } from "../../accounts/usecases/submit-account/submit-account.types";

export class SubmitAccountRepository implements ISubmitAccountRepository {

  constructor(private endpoint: string) { }

  createAccount(password: string): Promise<any> {

    return new Promise((resolve, reject) => {
      const opts: request.CoreOptions = {
        json: true,
        body: {
          password,
        }
      };
      request.post(this.endpoint, opts, (err, response, body) => {
        console.log(body);
      });

    })

  }

}