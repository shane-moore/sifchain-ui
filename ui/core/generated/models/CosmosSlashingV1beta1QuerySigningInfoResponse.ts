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
  ValSigningInfoIsTheSigningInfoOfRequestedValConsAddress,
  ValSigningInfoIsTheSigningInfoOfRequestedValConsAddressFromJSON,
  ValSigningInfoIsTheSigningInfoOfRequestedValConsAddressFromJSONTyped,
  ValSigningInfoIsTheSigningInfoOfRequestedValConsAddressToJSON,
} from "./";

/**
 *
 * @export
 * @interface CosmosSlashingV1beta1QuerySigningInfoResponse
 */
export interface CosmosSlashingV1beta1QuerySigningInfoResponse {
  /**
   *
   * @type {ValSigningInfoIsTheSigningInfoOfRequestedValConsAddress}
   * @memberof CosmosSlashingV1beta1QuerySigningInfoResponse
   */
  valSigningInfo?: ValSigningInfoIsTheSigningInfoOfRequestedValConsAddress;
}

export function CosmosSlashingV1beta1QuerySigningInfoResponseFromJSON(
  json: any,
): CosmosSlashingV1beta1QuerySigningInfoResponse {
  return CosmosSlashingV1beta1QuerySigningInfoResponseFromJSONTyped(
    json,
    false,
  );
}

export function CosmosSlashingV1beta1QuerySigningInfoResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosSlashingV1beta1QuerySigningInfoResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    valSigningInfo: !exists(json, "val_signing_info")
      ? undefined
      : ValSigningInfoIsTheSigningInfoOfRequestedValConsAddressFromJSON(
          json["val_signing_info"],
        ),
  };
}

export function CosmosSlashingV1beta1QuerySigningInfoResponseToJSON(
  value?: CosmosSlashingV1beta1QuerySigningInfoResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    val_signing_info: ValSigningInfoIsTheSigningInfoOfRequestedValConsAddressToJSON(
      value.valSigningInfo,
    ),
  };
}
