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
  InlineResponse20028RedelegationEntries,
  InlineResponse20028RedelegationEntriesFromJSON,
  InlineResponse20028RedelegationEntriesFromJSONTyped,
  InlineResponse20028RedelegationEntriesToJSON,
} from "./";

/**
 * RedelegationEntryResponse is equivalent to a RedelegationEntry except that it
 * contains a balance in addition to shares which is more suitable for client
 * responses.
 * @export
 * @interface CosmosStakingV1beta1RedelegationEntryResponse
 */
export interface CosmosStakingV1beta1RedelegationEntryResponse {
  /**
   *
   * @type {InlineResponse20028RedelegationEntries}
   * @memberof CosmosStakingV1beta1RedelegationEntryResponse
   */
  redelegationEntry?: InlineResponse20028RedelegationEntries;
  /**
   *
   * @type {string}
   * @memberof CosmosStakingV1beta1RedelegationEntryResponse
   */
  balance?: string;
}

export function CosmosStakingV1beta1RedelegationEntryResponseFromJSON(
  json: any,
): CosmosStakingV1beta1RedelegationEntryResponse {
  return CosmosStakingV1beta1RedelegationEntryResponseFromJSONTyped(
    json,
    false,
  );
}

export function CosmosStakingV1beta1RedelegationEntryResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosStakingV1beta1RedelegationEntryResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    redelegationEntry: !exists(json, "redelegation_entry")
      ? undefined
      : InlineResponse20028RedelegationEntriesFromJSON(
          json["redelegation_entry"],
        ),
    balance: !exists(json, "balance") ? undefined : json["balance"],
  };
}

export function CosmosStakingV1beta1RedelegationEntryResponseToJSON(
  value?: CosmosStakingV1beta1RedelegationEntryResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    redelegation_entry: InlineResponse20028RedelegationEntriesToJSON(
      value.redelegationEntry,
    ),
    balance: value.balance,
  };
}
