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
 * Version defines the versioning scheme used to negotiate the IBC verison in
 * the connection handshake.
 * @export
 * @interface IbcCoreConnectionV1Version
 */
export interface IbcCoreConnectionV1Version {
  /**
   *
   * @type {string}
   * @memberof IbcCoreConnectionV1Version
   */
  identifier?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof IbcCoreConnectionV1Version
   */
  features?: Array<string>;
}

export function IbcCoreConnectionV1VersionFromJSON(
  json: any,
): IbcCoreConnectionV1Version {
  return IbcCoreConnectionV1VersionFromJSONTyped(json, false);
}

export function IbcCoreConnectionV1VersionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): IbcCoreConnectionV1Version {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    identifier: !exists(json, "identifier") ? undefined : json["identifier"],
    features: !exists(json, "features") ? undefined : json["features"],
  };
}

export function IbcCoreConnectionV1VersionToJSON(
  value?: IbcCoreConnectionV1Version | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    identifier: value.identifier,
    features: value.features,
  };
}
