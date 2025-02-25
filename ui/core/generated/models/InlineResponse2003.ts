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
  InlineResponse2003Balance,
  InlineResponse2003BalanceFromJSON,
  InlineResponse2003BalanceFromJSONTyped,
  InlineResponse2003BalanceToJSON,
} from "./";

/**
 * QueryBalanceResponse is the response type for the Query/Balance RPC method.
 * @export
 * @interface InlineResponse2003
 */
export interface InlineResponse2003 {
  /**
   *
   * @type {InlineResponse2003Balance}
   * @memberof InlineResponse2003
   */
  balance?: InlineResponse2003Balance;
}

export function InlineResponse2003FromJSON(json: any): InlineResponse2003 {
  return InlineResponse2003FromJSONTyped(json, false);
}

export function InlineResponse2003FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse2003 {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    balance: !exists(json, "balance")
      ? undefined
      : InlineResponse2003BalanceFromJSON(json["balance"]),
  };
}

export function InlineResponse2003ToJSON(
  value?: InlineResponse2003 | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    balance: InlineResponse2003BalanceToJSON(value.balance),
  };
}
