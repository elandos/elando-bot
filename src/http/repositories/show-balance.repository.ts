import * as request from "request";
var debug = require("debug")("show-balance.repository:");

import { IShowBalanceRepository } from "../../balances/usecases/show-balance/show-balance.types";
import { Balance } from "../../balances/entities/balance";

interface ShowBalanceResponse {
  data: {
    value: number;
    unit: string;
  }
}

export class ShowBalanceRepository implements IShowBalanceRepository {

  constructor(private ethEndpoint: string) { }

  findBalanceByAddress(address: string): Promise<Balance> {
    return this.findBalance(address);
  }

  private findBalance(address: string): Promise<Balance> {
    return new Promise((resolve, reject) => {
      const opts: request.CoreOptions = {
        json: true,
        body: {
          address,
        }
      };

      debug("ethEndpoint:", this.ethEndpoint);
      request.post(this.ethEndpoint, opts, (err, response, body) => {
        debug("response", response);
        if (err) {
          debug("error", err);
          reject(err);
        }

        debug("body", body);
        const { data } = body as ShowBalanceResponse;

        resolve({
          unit: data.unit,
          value: data.value,
        });

      });
    });
  }
}