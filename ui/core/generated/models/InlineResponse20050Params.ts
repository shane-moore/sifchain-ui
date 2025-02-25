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
 * params defines the parameters of the module.
 * @export
 * @interface InlineResponse20050Params
 */
export interface InlineResponse20050Params {
  /**
   * send_enabled enables or disables all cross-chain token transfers from this
   * chain.
   * @type {boolean}
   * @memberof InlineResponse20050Params
   */
  sendEnabled?: boolean;
  /**
   * receive_enabled enables or disables all cross-chain token transfers to this
   * chain.
   * @type {boolean}
   * @memberof InlineResponse20050Params
   */
  receiveEnabled?: boolean;
}

export function InlineResponse20050ParamsFromJSON(
  json: any,
): InlineResponse20050Params {
  return InlineResponse20050ParamsFromJSONTyped(json, false);
}

export function InlineResponse20050ParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse20050Params {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    sendEnabled: !exists(json, "send_enabled")
      ? undefined
      : json["send_enabled"],
    receiveEnabled: !exists(json, "receive_enabled")
      ? undefined
      : json["receive_enabled"],
  };
}

export function InlineResponse20050ParamsToJSON(
  value?: InlineResponse20050Params | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    send_enabled: value.sendEnabled,
    receive_enabled: value.receiveEnabled,
  };
}
