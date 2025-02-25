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
  InlineResponse20044ClientStates,
  InlineResponse20044ClientStatesFromJSON,
  InlineResponse20044ClientStatesFromJSONTyped,
  InlineResponse20044ClientStatesToJSON,
  PaginationResponse,
  PaginationResponseFromJSON,
  PaginationResponseFromJSONTyped,
  PaginationResponseToJSON,
} from "./";

/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 * @export
 * @interface InlineResponse20044
 */
export interface InlineResponse20044 {
  /**
   * list of stored ClientStates of the chain.
   * @type {Array<InlineResponse20044ClientStates>}
   * @memberof InlineResponse20044
   */
  clientStates?: Array<InlineResponse20044ClientStates>;
  /**
   *
   * @type {PaginationResponse}
   * @memberof InlineResponse20044
   */
  pagination?: PaginationResponse;
}

export function InlineResponse20044FromJSON(json: any): InlineResponse20044 {
  return InlineResponse20044FromJSONTyped(json, false);
}

export function InlineResponse20044FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse20044 {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    clientStates: !exists(json, "client_states")
      ? undefined
      : (json["client_states"] as Array<any>).map(
          InlineResponse20044ClientStatesFromJSON,
        ),
    pagination: !exists(json, "pagination")
      ? undefined
      : PaginationResponseFromJSON(json["pagination"]),
  };
}

export function InlineResponse20044ToJSON(
  value?: InlineResponse20044 | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    client_states:
      value.clientStates === undefined
        ? undefined
        : (value.clientStates as Array<any>).map(
            InlineResponse20044ClientStatesToJSON,
          ),
    pagination: PaginationResponseToJSON(value.pagination),
  };
}
