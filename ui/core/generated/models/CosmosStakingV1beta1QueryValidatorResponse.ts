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
  InlineResponse20031Validator,
  InlineResponse20031ValidatorFromJSON,
  InlineResponse20031ValidatorFromJSONTyped,
  InlineResponse20031ValidatorToJSON,
} from "./";

/**
 *
 * @export
 * @interface CosmosStakingV1beta1QueryValidatorResponse
 */
export interface CosmosStakingV1beta1QueryValidatorResponse {
  /**
   *
   * @type {InlineResponse20031Validator}
   * @memberof CosmosStakingV1beta1QueryValidatorResponse
   */
  validator?: InlineResponse20031Validator;
}

export function CosmosStakingV1beta1QueryValidatorResponseFromJSON(
  json: any,
): CosmosStakingV1beta1QueryValidatorResponse {
  return CosmosStakingV1beta1QueryValidatorResponseFromJSONTyped(json, false);
}

export function CosmosStakingV1beta1QueryValidatorResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosStakingV1beta1QueryValidatorResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    validator: !exists(json, "validator")
      ? undefined
      : InlineResponse20031ValidatorFromJSON(json["validator"]),
  };
}

export function CosmosStakingV1beta1QueryValidatorResponseToJSON(
  value?: CosmosStakingV1beta1QueryValidatorResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    validator: InlineResponse20031ValidatorToJSON(value.validator),
  };
}
