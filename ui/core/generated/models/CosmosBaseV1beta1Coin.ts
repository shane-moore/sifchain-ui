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
/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 * @export
 * @interface CosmosBaseV1beta1Coin
 */
export interface CosmosBaseV1beta1Coin {
  /**
   *
   * @type {string}
   * @memberof CosmosBaseV1beta1Coin
   */
  denom?: string;
  /**
   *
   * @type {string}
   * @memberof CosmosBaseV1beta1Coin
   */
  amount?: string;
}

export function CosmosBaseV1beta1CoinFromJSON(
  json: any,
): CosmosBaseV1beta1Coin {
  return CosmosBaseV1beta1CoinFromJSONTyped(json, false);
}

export function CosmosBaseV1beta1CoinFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosBaseV1beta1Coin {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    denom: !exists(json, "denom") ? undefined : json["denom"],
    amount: !exists(json, "amount") ? undefined : json["amount"],
  };
}

export function CosmosBaseV1beta1CoinToJSON(
  value?: CosmosBaseV1beta1Coin | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    denom: value.denom,
    amount: value.amount,
  };
}
