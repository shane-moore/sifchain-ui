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
 * @interface OsmosisGammV1beta1SmoothWeightChangeParams
 */
export interface OsmosisGammV1beta1SmoothWeightChangeParams {
  /**
   * The start time for beginning the weight change.
   * If a parameter change / pool instantiation leaves this blank,
   * it should be generated by the state_machine as the current time.
   * @type {Date}
   * @memberof OsmosisGammV1beta1SmoothWeightChangeParams
   */
  startTime?: Date;
  /**
   *
   * @type {string}
   * @memberof OsmosisGammV1beta1SmoothWeightChangeParams
   */
  duration?: string;
  /**
   * The initial pool weights. These are copied from the pool's settings
   * at the time of weight change instantiation.
   * The amount PoolAsset.token.amount field is ignored if present,
   * future type refactorings should just have a type with the denom & weight
   * here.
   * @type {Array<ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeights>}
   * @memberof OsmosisGammV1beta1SmoothWeightChangeParams
   */
  initialPoolWeights?: Array<ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeights>;
  /**
   * The target pool weights. The pool weights will change linearly with respect
   * to time between start_time, and start_time + duration. The amount
   * PoolAsset.token.amount field is ignored if present, future type
   * refactorings should just have a type with the denom & weight here.
   * @type {Array<ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeights>}
   * @memberof OsmosisGammV1beta1SmoothWeightChangeParams
   */
  targetPoolWeights?: Array<ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeights>;
}

export function OsmosisGammV1beta1SmoothWeightChangeParamsFromJSON(
  json: any,
): OsmosisGammV1beta1SmoothWeightChangeParams {
  return OsmosisGammV1beta1SmoothWeightChangeParamsFromJSONTyped(json, false);
}

export function OsmosisGammV1beta1SmoothWeightChangeParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): OsmosisGammV1beta1SmoothWeightChangeParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    startTime: !exists(json, "start_time")
      ? undefined
      : new Date(json["start_time"]),
    duration: !exists(json, "duration") ? undefined : json["duration"],
    initialPoolWeights: !exists(json, "initialPoolWeights")
      ? undefined
      : (json["initialPoolWeights"] as Array<any>).map(
          ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsFromJSON,
        ),
    targetPoolWeights: !exists(json, "targetPoolWeights")
      ? undefined
      : (json["targetPoolWeights"] as Array<any>).map(
          ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsFromJSON,
        ),
  };
}

export function OsmosisGammV1beta1SmoothWeightChangeParamsToJSON(
  value?: OsmosisGammV1beta1SmoothWeightChangeParams | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    start_time:
      value.startTime === undefined ? undefined : value.startTime.toISOString(),
    duration: value.duration,
    initialPoolWeights:
      value.initialPoolWeights === undefined
        ? undefined
        : (value.initialPoolWeights as Array<any>).map(
            ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsToJSON,
          ),
    targetPoolWeights:
      value.targetPoolWeights === undefined
        ? undefined
        : (value.targetPoolWeights as Array<any>).map(
            ParametersForChangingTheWeightsInABalancerPoolSmoothlyFromAStartWeightAndEndWeightOverAPeriodOfTimeCurrentlyTheOnlySmoothChangeSupportedIsLinearChangingBetweenTheTwoWeightsButMoreTypesMayBeAddedInTheFutureWhenTheseParametersAreSetTheWeightWTForPoolTimeTIsTheFollowingTStartTimeWTInitialPoolWeightsStartTimeTStartTimeDurationWTInitialPoolWeightsTStartTimeTargetPoolWeightsInitialPoolWeightsDurationTStartTimeDurationWTTargetPoolWeightsInitialPoolWeightsToJSON,
          ),
  };
}
