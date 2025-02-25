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
  InlineResponse20029Entries,
  InlineResponse20029EntriesFromJSON,
  InlineResponse20029EntriesFromJSONTyped,
  InlineResponse20029EntriesToJSON,
} from "./";

/**
 * UnbondingDelegation stores all of a single delegator's unbonding bonds
 * for a single validator in an time-ordered list.
 * @export
 * @interface InlineResponse20029UnbondingResponses
 */
export interface InlineResponse20029UnbondingResponses {
  /**
   * delegator_address is the bech32-encoded address of the delegator.
   * @type {string}
   * @memberof InlineResponse20029UnbondingResponses
   */
  delegatorAddress?: string;
  /**
   * validator_address is the bech32-encoded address of the validator.
   * @type {string}
   * @memberof InlineResponse20029UnbondingResponses
   */
  validatorAddress?: string;
  /**
   * entries are the unbonding delegation entries.
   * @type {Array<InlineResponse20029Entries>}
   * @memberof InlineResponse20029UnbondingResponses
   */
  entries?: Array<InlineResponse20029Entries>;
}

export function InlineResponse20029UnbondingResponsesFromJSON(
  json: any,
): InlineResponse20029UnbondingResponses {
  return InlineResponse20029UnbondingResponsesFromJSONTyped(json, false);
}

export function InlineResponse20029UnbondingResponsesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse20029UnbondingResponses {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    delegatorAddress: !exists(json, "delegator_address")
      ? undefined
      : json["delegator_address"],
    validatorAddress: !exists(json, "validator_address")
      ? undefined
      : json["validator_address"],
    entries: !exists(json, "entries")
      ? undefined
      : (json["entries"] as Array<any>).map(InlineResponse20029EntriesFromJSON),
  };
}

export function InlineResponse20029UnbondingResponsesToJSON(
  value?: InlineResponse20029UnbondingResponses | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    delegator_address: value.delegatorAddress,
    validator_address: value.validatorAddress,
    entries:
      value.entries === undefined
        ? undefined
        : (value.entries as Array<any>).map(InlineResponse20029EntriesToJSON),
  };
}
