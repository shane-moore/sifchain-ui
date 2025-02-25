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
 * QueryDelegatorValidatorResponse response type for the
 * Query/DelegatorValidator RPC method.
 * @export
 * @interface InlineResponse20031
 */
export interface InlineResponse20031 {
  /**
   *
   * @type {InlineResponse20031Validator}
   * @memberof InlineResponse20031
   */
  validator?: InlineResponse20031Validator;
}

export function InlineResponse20031FromJSON(json: any): InlineResponse20031 {
  return InlineResponse20031FromJSONTyped(json, false);
}

export function InlineResponse20031FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse20031 {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    validator: !exists(json, "validator")
      ? undefined
      : InlineResponse20031ValidatorFromJSON(json["validator"]),
  };
}

export function InlineResponse20031ToJSON(
  value?: InlineResponse20031 | null,
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
