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
 * Delegation represents the bond with tokens held by an account. It is
 * owned by one delegator, and is associated with the voting power of one
 * validator.
 * @export
 * @interface CosmosStakingV1beta1Delegation
 */
export interface CosmosStakingV1beta1Delegation {
  /**
   * delegator_address is the bech32-encoded address of the delegator.
   * @type {string}
   * @memberof CosmosStakingV1beta1Delegation
   */
  delegatorAddress?: string;
  /**
   * validator_address is the bech32-encoded address of the validator.
   * @type {string}
   * @memberof CosmosStakingV1beta1Delegation
   */
  validatorAddress?: string;
  /**
   * shares define the delegation shares received.
   * @type {string}
   * @memberof CosmosStakingV1beta1Delegation
   */
  shares?: string;
}

export function CosmosStakingV1beta1DelegationFromJSON(
  json: any,
): CosmosStakingV1beta1Delegation {
  return CosmosStakingV1beta1DelegationFromJSONTyped(json, false);
}

export function CosmosStakingV1beta1DelegationFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosStakingV1beta1Delegation {
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
    shares: !exists(json, "shares") ? undefined : json["shares"],
  };
}

export function CosmosStakingV1beta1DelegationToJSON(
  value?: CosmosStakingV1beta1Delegation | null,
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
    shares: value.shares,
  };
}
