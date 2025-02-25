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
  ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeights,
  ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsFromJSON,
  ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsFromJSONTyped,
  ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsToJSON,
} from "./";

/**
 *
 * @export
 * @interface OsmosisGammV1beta1QueryPoolAssetsResponse
 */
export interface OsmosisGammV1beta1QueryPoolAssetsResponse {
  /**
   *
   * @type {Array<ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeights>}
   * @memberof OsmosisGammV1beta1QueryPoolAssetsResponse
   */
  poolAssets?: Array<ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeights>;
}

export function OsmosisGammV1beta1QueryPoolAssetsResponseFromJSON(
  json: any,
): OsmosisGammV1beta1QueryPoolAssetsResponse {
  return OsmosisGammV1beta1QueryPoolAssetsResponseFromJSONTyped(json, false);
}

export function OsmosisGammV1beta1QueryPoolAssetsResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): OsmosisGammV1beta1QueryPoolAssetsResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    poolAssets: !exists(json, "poolAssets")
      ? undefined
      : (json["poolAssets"] as Array<any>).map(
          ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsFromJSON,
        ),
  };
}

export function OsmosisGammV1beta1QueryPoolAssetsResponseToJSON(
  value?: OsmosisGammV1beta1QueryPoolAssetsResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    poolAssets:
      value.poolAssets === undefined
        ? undefined
        : (value.poolAssets as Array<any>).map(
            ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsToJSON,
          ),
  };
}
