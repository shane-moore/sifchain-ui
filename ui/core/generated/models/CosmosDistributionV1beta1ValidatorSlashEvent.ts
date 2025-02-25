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
 * ValidatorSlashEvent represents a validator slash event.
 * Height is implicit within the store key.
 * This is needed to calculate appropriate amount of staking tokens
 * for delegations which are withdrawn after a slash has occurred.
 * @export
 * @interface CosmosDistributionV1beta1ValidatorSlashEvent
 */
export interface CosmosDistributionV1beta1ValidatorSlashEvent {
  /**
   *
   * @type {string}
   * @memberof CosmosDistributionV1beta1ValidatorSlashEvent
   */
  validatorPeriod?: string;
  /**
   *
   * @type {string}
   * @memberof CosmosDistributionV1beta1ValidatorSlashEvent
   */
  fraction?: string;
}

export function CosmosDistributionV1beta1ValidatorSlashEventFromJSON(
  json: any,
): CosmosDistributionV1beta1ValidatorSlashEvent {
  return CosmosDistributionV1beta1ValidatorSlashEventFromJSONTyped(json, false);
}

export function CosmosDistributionV1beta1ValidatorSlashEventFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosDistributionV1beta1ValidatorSlashEvent {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    validatorPeriod: !exists(json, "validator_period")
      ? undefined
      : json["validator_period"],
    fraction: !exists(json, "fraction") ? undefined : json["fraction"],
  };
}

export function CosmosDistributionV1beta1ValidatorSlashEventToJSON(
  value?: CosmosDistributionV1beta1ValidatorSlashEvent | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    validator_period: value.validatorPeriod,
    fraction: value.fraction,
  };
}
