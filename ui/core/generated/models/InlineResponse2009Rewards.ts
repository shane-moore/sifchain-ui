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
  InlineResponse2008Pool,
  InlineResponse2008PoolFromJSON,
  InlineResponse2008PoolFromJSONTyped,
  InlineResponse2008PoolToJSON,
} from "./";

/**
 * DelegationDelegatorReward represents the properties
 * of a delegator's delegation reward.
 * @export
 * @interface InlineResponse2009Rewards
 */
export interface InlineResponse2009Rewards {
  /**
   *
   * @type {string}
   * @memberof InlineResponse2009Rewards
   */
  validatorAddress?: string;
  /**
   *
   * @type {Array<InlineResponse2008Pool>}
   * @memberof InlineResponse2009Rewards
   */
  reward?: Array<InlineResponse2008Pool>;
}

export function InlineResponse2009RewardsFromJSON(
  json: any,
): InlineResponse2009Rewards {
  return InlineResponse2009RewardsFromJSONTyped(json, false);
}

export function InlineResponse2009RewardsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse2009Rewards {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    validatorAddress: !exists(json, "validator_address")
      ? undefined
      : json["validator_address"],
    reward: !exists(json, "reward")
      ? undefined
      : (json["reward"] as Array<any>).map(InlineResponse2008PoolFromJSON),
  };
}

export function InlineResponse2009RewardsToJSON(
  value?: InlineResponse2009Rewards | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    validator_address: value.validatorAddress,
    reward:
      value.reward === undefined
        ? undefined
        : (value.reward as Array<any>).map(InlineResponse2008PoolToJSON),
  };
}
