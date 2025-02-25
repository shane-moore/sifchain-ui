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
  OsmosisPoolincentivesV1beta1QueryParamsResponseParams,
  OsmosisPoolincentivesV1beta1QueryParamsResponseParamsFromJSON,
  OsmosisPoolincentivesV1beta1QueryParamsResponseParamsFromJSONTyped,
  OsmosisPoolincentivesV1beta1QueryParamsResponseParamsToJSON,
} from "./";

/**
 *
 * @export
 * @interface OsmosisPoolincentivesV1beta1QueryParamsResponse
 */
export interface OsmosisPoolincentivesV1beta1QueryParamsResponse {
  /**
   *
   * @type {OsmosisPoolincentivesV1beta1QueryParamsResponseParams}
   * @memberof OsmosisPoolincentivesV1beta1QueryParamsResponse
   */
  params?: OsmosisPoolincentivesV1beta1QueryParamsResponseParams;
}

export function OsmosisPoolincentivesV1beta1QueryParamsResponseFromJSON(
  json: any,
): OsmosisPoolincentivesV1beta1QueryParamsResponse {
  return OsmosisPoolincentivesV1beta1QueryParamsResponseFromJSONTyped(
    json,
    false,
  );
}

export function OsmosisPoolincentivesV1beta1QueryParamsResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): OsmosisPoolincentivesV1beta1QueryParamsResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    params: !exists(json, "params")
      ? undefined
      : OsmosisPoolincentivesV1beta1QueryParamsResponseParamsFromJSON(
          json["params"],
        ),
  };
}

export function OsmosisPoolincentivesV1beta1QueryParamsResponseToJSON(
  value?: OsmosisPoolincentivesV1beta1QueryParamsResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    params: OsmosisPoolincentivesV1beta1QueryParamsResponseParamsToJSON(
      value.params,
    ),
  };
}
