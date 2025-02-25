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
 * ValidatorAccumulatedCommission represents accumulated commission
 * for a validator kept as a running counter, can be withdrawn at any time.
 * @export
 * @interface CosmosDistributionV1beta1ValidatorAccumulatedCommission
 */
export interface CosmosDistributionV1beta1ValidatorAccumulatedCommission {
  /**
   *
   * @type {Array<InlineResponse2008Pool>}
   * @memberof CosmosDistributionV1beta1ValidatorAccumulatedCommission
   */
  commission?: Array<InlineResponse2008Pool>;
}

export function CosmosDistributionV1beta1ValidatorAccumulatedCommissionFromJSON(
  json: any,
): CosmosDistributionV1beta1ValidatorAccumulatedCommission {
  return CosmosDistributionV1beta1ValidatorAccumulatedCommissionFromJSONTyped(
    json,
    false,
  );
}

export function CosmosDistributionV1beta1ValidatorAccumulatedCommissionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosDistributionV1beta1ValidatorAccumulatedCommission {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    commission: !exists(json, "commission")
      ? undefined
      : (json["commission"] as Array<any>).map(InlineResponse2008PoolFromJSON),
  };
}

export function CosmosDistributionV1beta1ValidatorAccumulatedCommissionToJSON(
  value?: CosmosDistributionV1beta1ValidatorAccumulatedCommission | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    commission:
      value.commission === undefined
        ? undefined
        : (value.commission as Array<any>).map(InlineResponse2008PoolToJSON),
  };
}
