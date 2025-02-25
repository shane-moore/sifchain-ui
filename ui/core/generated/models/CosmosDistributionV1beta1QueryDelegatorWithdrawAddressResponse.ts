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
 * QueryDelegatorWithdrawAddressResponse is the response type for the
 * Query/DelegatorWithdrawAddress RPC method.
 * @export
 * @interface CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponse
 */
export interface CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponse {
  /**
   * withdraw_address defines the delegator address to query for.
   * @type {string}
   * @memberof CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponse
   */
  withdrawAddress?: string;
}

export function CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponseFromJSON(
  json: any,
): CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponse {
  return CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponseFromJSONTyped(
    json,
    false,
  );
}

export function CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    withdrawAddress: !exists(json, "withdraw_address")
      ? undefined
      : json["withdraw_address"],
  };
}

export function CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponseToJSON(
  value?: CosmosDistributionV1beta1QueryDelegatorWithdrawAddressResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    withdraw_address: value.withdrawAddress,
  };
}
