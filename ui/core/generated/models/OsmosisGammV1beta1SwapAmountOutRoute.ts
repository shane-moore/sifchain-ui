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
 *
 * @export
 * @interface OsmosisGammV1beta1SwapAmountOutRoute
 */
export interface OsmosisGammV1beta1SwapAmountOutRoute {
  /**
   *
   * @type {string}
   * @memberof OsmosisGammV1beta1SwapAmountOutRoute
   */
  poolId?: string;
  /**
   *
   * @type {string}
   * @memberof OsmosisGammV1beta1SwapAmountOutRoute
   */
  tokenInDenom?: string;
}

export function OsmosisGammV1beta1SwapAmountOutRouteFromJSON(
  json: any,
): OsmosisGammV1beta1SwapAmountOutRoute {
  return OsmosisGammV1beta1SwapAmountOutRouteFromJSONTyped(json, false);
}

export function OsmosisGammV1beta1SwapAmountOutRouteFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): OsmosisGammV1beta1SwapAmountOutRoute {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    poolId: !exists(json, "poolId") ? undefined : json["poolId"],
    tokenInDenom: !exists(json, "tokenInDenom")
      ? undefined
      : json["tokenInDenom"],
  };
}

export function OsmosisGammV1beta1SwapAmountOutRouteToJSON(
  value?: OsmosisGammV1beta1SwapAmountOutRoute | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    poolId: value.poolId,
    tokenInDenom: value.tokenInDenom,
  };
}
