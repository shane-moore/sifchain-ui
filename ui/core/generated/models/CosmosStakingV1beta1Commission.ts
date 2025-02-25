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
  InlineResponse20030CommissionCommissionRates,
  InlineResponse20030CommissionCommissionRatesFromJSON,
  InlineResponse20030CommissionCommissionRatesFromJSONTyped,
  InlineResponse20030CommissionCommissionRatesToJSON,
} from "./";

/**
 * Commission defines commission parameters for a given validator.
 * @export
 * @interface CosmosStakingV1beta1Commission
 */
export interface CosmosStakingV1beta1Commission {
  /**
   *
   * @type {InlineResponse20030CommissionCommissionRates}
   * @memberof CosmosStakingV1beta1Commission
   */
  commissionRates?: InlineResponse20030CommissionCommissionRates;
  /**
   * update_time is the last time the commission rate was changed.
   * @type {Date}
   * @memberof CosmosStakingV1beta1Commission
   */
  updateTime?: Date;
}

export function CosmosStakingV1beta1CommissionFromJSON(
  json: any,
): CosmosStakingV1beta1Commission {
  return CosmosStakingV1beta1CommissionFromJSONTyped(json, false);
}

export function CosmosStakingV1beta1CommissionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosStakingV1beta1Commission {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    commissionRates: !exists(json, "commission_rates")
      ? undefined
      : InlineResponse20030CommissionCommissionRatesFromJSON(
          json["commission_rates"],
        ),
    updateTime: !exists(json, "update_time")
      ? undefined
      : new Date(json["update_time"]),
  };
}

export function CosmosStakingV1beta1CommissionToJSON(
  value?: CosmosStakingV1beta1Commission | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    commission_rates: InlineResponse20030CommissionCommissionRatesToJSON(
      value.commissionRates,
    ),
    update_time:
      value.updateTime === undefined
        ? undefined
        : value.updateTime.toISOString(),
  };
}
