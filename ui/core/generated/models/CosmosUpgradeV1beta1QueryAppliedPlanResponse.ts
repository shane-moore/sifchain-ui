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
 * QueryAppliedPlanResponse is the response type for the Query/AppliedPlan RPC
 * method.
 * @export
 * @interface CosmosUpgradeV1beta1QueryAppliedPlanResponse
 */
export interface CosmosUpgradeV1beta1QueryAppliedPlanResponse {
  /**
   * height is the block height at which the plan was applied.
   * @type {string}
   * @memberof CosmosUpgradeV1beta1QueryAppliedPlanResponse
   */
  height?: string;
}

export function CosmosUpgradeV1beta1QueryAppliedPlanResponseFromJSON(
  json: any,
): CosmosUpgradeV1beta1QueryAppliedPlanResponse {
  return CosmosUpgradeV1beta1QueryAppliedPlanResponseFromJSONTyped(json, false);
}

export function CosmosUpgradeV1beta1QueryAppliedPlanResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosUpgradeV1beta1QueryAppliedPlanResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    height: !exists(json, "height") ? undefined : json["height"],
  };
}

export function CosmosUpgradeV1beta1QueryAppliedPlanResponseToJSON(
  value?: CosmosUpgradeV1beta1QueryAppliedPlanResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    height: value.height,
  };
}
