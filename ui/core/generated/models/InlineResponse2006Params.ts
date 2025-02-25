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
  InlineResponse2006ParamsSendEnabled,
  InlineResponse2006ParamsSendEnabledFromJSON,
  InlineResponse2006ParamsSendEnabledFromJSONTyped,
  InlineResponse2006ParamsSendEnabledToJSON,
} from "./";

/**
 * Params defines the parameters for the bank module.
 * @export
 * @interface InlineResponse2006Params
 */
export interface InlineResponse2006Params {
  /**
   *
   * @type {Array<InlineResponse2006ParamsSendEnabled>}
   * @memberof InlineResponse2006Params
   */
  sendEnabled?: Array<InlineResponse2006ParamsSendEnabled>;
  /**
   *
   * @type {boolean}
   * @memberof InlineResponse2006Params
   */
  defaultSendEnabled?: boolean;
}

export function InlineResponse2006ParamsFromJSON(
  json: any,
): InlineResponse2006Params {
  return InlineResponse2006ParamsFromJSONTyped(json, false);
}

export function InlineResponse2006ParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse2006Params {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    sendEnabled: !exists(json, "send_enabled")
      ? undefined
      : (json["send_enabled"] as Array<any>).map(
          InlineResponse2006ParamsSendEnabledFromJSON,
        ),
    defaultSendEnabled: !exists(json, "default_send_enabled")
      ? undefined
      : json["default_send_enabled"],
  };
}

export function InlineResponse2006ParamsToJSON(
  value?: InlineResponse2006Params | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    send_enabled:
      value.sendEnabled === undefined
        ? undefined
        : (value.sendEnabled as Array<any>).map(
            InlineResponse2006ParamsSendEnabledToJSON,
          ),
    default_send_enabled: value.defaultSendEnabled,
  };
}
