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
  InlineResponse2002Pagination,
  InlineResponse2002PaginationFromJSON,
  InlineResponse2002PaginationFromJSONTyped,
  InlineResponse2002PaginationToJSON,
  InlineResponse2004Metadatas,
  InlineResponse2004MetadatasFromJSON,
  InlineResponse2004MetadatasFromJSONTyped,
  InlineResponse2004MetadatasToJSON,
} from "./";

/**
 * QueryDenomsMetadataResponse is the response type for the Query/DenomsMetadata RPC
 * method.
 * @export
 * @interface CosmosBankV1beta1QueryDenomsMetadataResponse
 */
export interface CosmosBankV1beta1QueryDenomsMetadataResponse {
  /**
   * metadata provides the client information for all the registered tokens.
   * @type {Array<InlineResponse2004Metadatas>}
   * @memberof CosmosBankV1beta1QueryDenomsMetadataResponse
   */
  metadatas?: Array<InlineResponse2004Metadatas>;
  /**
   *
   * @type {InlineResponse2002Pagination}
   * @memberof CosmosBankV1beta1QueryDenomsMetadataResponse
   */
  pagination?: InlineResponse2002Pagination;
}

export function CosmosBankV1beta1QueryDenomsMetadataResponseFromJSON(
  json: any,
): CosmosBankV1beta1QueryDenomsMetadataResponse {
  return CosmosBankV1beta1QueryDenomsMetadataResponseFromJSONTyped(json, false);
}

export function CosmosBankV1beta1QueryDenomsMetadataResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosBankV1beta1QueryDenomsMetadataResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    metadatas: !exists(json, "metadatas")
      ? undefined
      : (json["metadatas"] as Array<any>).map(
          InlineResponse2004MetadatasFromJSON,
        ),
    pagination: !exists(json, "pagination")
      ? undefined
      : InlineResponse2002PaginationFromJSON(json["pagination"]),
  };
}

export function CosmosBankV1beta1QueryDenomsMetadataResponseToJSON(
  value?: CosmosBankV1beta1QueryDenomsMetadataResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    metadatas:
      value.metadatas === undefined
        ? undefined
        : (value.metadatas as Array<any>).map(
            InlineResponse2004MetadatasToJSON,
          ),
    pagination: InlineResponse2002PaginationToJSON(value.pagination),
  };
}
