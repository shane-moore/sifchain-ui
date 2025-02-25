/* tslint:disable */
/* eslint-disable */
/**
 * Sifchain - gRPC Gateway docs
 * A REST interface for state queries, legacy transactions
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
import {
  InlineResponse2002Balances,
  InlineResponse2002BalancesFromJSON,
  InlineResponse2002BalancesFromJSONTyped,
  InlineResponse2002BalancesToJSON,
} from "./";

/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 * @export
 * @interface InlineResponse20021Deposits
 */
export interface InlineResponse20021Deposits {
  /**
   *
   * @type {string}
   * @memberof InlineResponse20021Deposits
   */
  proposalId?: string;
  /**
   *
   * @type {string}
   * @memberof InlineResponse20021Deposits
   */
  depositor?: string;
  /**
   *
   * @type {Array<InlineResponse2002Balances>}
   * @memberof InlineResponse20021Deposits
   */
  amount?: Array<InlineResponse2002Balances>;
}

export function InlineResponse20021DepositsFromJSON(
  json: any,
): InlineResponse20021Deposits {
  return InlineResponse20021DepositsFromJSONTyped(json, false);
}

export function InlineResponse20021DepositsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse20021Deposits {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    proposalId: !exists(json, "proposal_id") ? undefined : json["proposal_id"],
    depositor: !exists(json, "depositor") ? undefined : json["depositor"],
    amount: !exists(json, "amount")
      ? undefined
      : (json["amount"] as Array<any>).map(InlineResponse2002BalancesFromJSON),
  };
}

export function InlineResponse20021DepositsToJSON(
  value?: InlineResponse20021Deposits | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    proposal_id: value.proposalId,
    depositor: value.depositor,
    amount:
      value.amount === undefined
        ? undefined
        : (value.amount as Array<any>).map(InlineResponse2002BalancesToJSON),
  };
}
