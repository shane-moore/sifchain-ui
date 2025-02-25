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
  InlineResponse2005Metadata,
  InlineResponse2005MetadataFromJSON,
  InlineResponse2005MetadataFromJSONTyped,
  InlineResponse2005MetadataToJSON,
} from "./";

/**
 * QueryDenomMetadataResponse is the response type for the Query/DenomMetadata RPC
 * method.
 * @export
 * @interface CosmosBankV1beta1QueryDenomMetadataResponse
 */
export interface CosmosBankV1beta1QueryDenomMetadataResponse {
  /**
   *
   * @type {InlineResponse2005Metadata}
   * @memberof CosmosBankV1beta1QueryDenomMetadataResponse
   */
  metadata?: InlineResponse2005Metadata;
}

export function CosmosBankV1beta1QueryDenomMetadataResponseFromJSON(
  json: any,
): CosmosBankV1beta1QueryDenomMetadataResponse {
  return CosmosBankV1beta1QueryDenomMetadataResponseFromJSONTyped(json, false);
}

export function CosmosBankV1beta1QueryDenomMetadataResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosBankV1beta1QueryDenomMetadataResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    metadata: !exists(json, "metadata")
      ? undefined
      : InlineResponse2005MetadataFromJSON(json["metadata"]),
  };
}

export function CosmosBankV1beta1QueryDenomMetadataResponseToJSON(
  value?: CosmosBankV1beta1QueryDenomMetadataResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    metadata: InlineResponse2005MetadataToJSON(value.metadata),
  };
}
