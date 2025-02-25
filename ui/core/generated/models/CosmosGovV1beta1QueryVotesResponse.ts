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
  InlineResponse20024Votes,
  InlineResponse20024VotesFromJSON,
  InlineResponse20024VotesFromJSONTyped,
  InlineResponse20024VotesToJSON,
  InlineResponse2002Pagination,
  InlineResponse2002PaginationFromJSON,
  InlineResponse2002PaginationFromJSONTyped,
  InlineResponse2002PaginationToJSON,
} from "./";

/**
 * QueryVotesResponse is the response type for the Query/Votes RPC method.
 * @export
 * @interface CosmosGovV1beta1QueryVotesResponse
 */
export interface CosmosGovV1beta1QueryVotesResponse {
  /**
   * votes defined the queried votes.
   * @type {Array<InlineResponse20024Votes>}
   * @memberof CosmosGovV1beta1QueryVotesResponse
   */
  votes?: Array<InlineResponse20024Votes>;
  /**
   *
   * @type {InlineResponse2002Pagination}
   * @memberof CosmosGovV1beta1QueryVotesResponse
   */
  pagination?: InlineResponse2002Pagination;
}

export function CosmosGovV1beta1QueryVotesResponseFromJSON(
  json: any,
): CosmosGovV1beta1QueryVotesResponse {
  return CosmosGovV1beta1QueryVotesResponseFromJSONTyped(json, false);
}

export function CosmosGovV1beta1QueryVotesResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosGovV1beta1QueryVotesResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    votes: !exists(json, "votes")
      ? undefined
      : (json["votes"] as Array<any>).map(InlineResponse20024VotesFromJSON),
    pagination: !exists(json, "pagination")
      ? undefined
      : InlineResponse2002PaginationFromJSON(json["pagination"]),
  };
}

export function CosmosGovV1beta1QueryVotesResponseToJSON(
  value?: CosmosGovV1beta1QueryVotesResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    votes:
      value.votes === undefined
        ? undefined
        : (value.votes as Array<any>).map(InlineResponse20024VotesToJSON),
    pagination: InlineResponse2002PaginationToJSON(value.pagination),
  };
}
