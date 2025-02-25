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
  InlineResponse20028RedelegationResponses,
  InlineResponse20028RedelegationResponsesFromJSON,
  InlineResponse20028RedelegationResponsesFromJSONTyped,
  InlineResponse20028RedelegationResponsesToJSON,
  InlineResponse2002Pagination,
  InlineResponse2002PaginationFromJSON,
  InlineResponse2002PaginationFromJSONTyped,
  InlineResponse2002PaginationToJSON,
} from "./";

/**
 * QueryRedelegationsResponse is response type for the Query/Redelegations RPC
 * method.
 * @export
 * @interface CosmosStakingV1beta1QueryRedelegationsResponse
 */
export interface CosmosStakingV1beta1QueryRedelegationsResponse {
  /**
   *
   * @type {Array<InlineResponse20028RedelegationResponses>}
   * @memberof CosmosStakingV1beta1QueryRedelegationsResponse
   */
  redelegationResponses?: Array<InlineResponse20028RedelegationResponses>;
  /**
   *
   * @type {InlineResponse2002Pagination}
   * @memberof CosmosStakingV1beta1QueryRedelegationsResponse
   */
  pagination?: InlineResponse2002Pagination;
}

export function CosmosStakingV1beta1QueryRedelegationsResponseFromJSON(
  json: any,
): CosmosStakingV1beta1QueryRedelegationsResponse {
  return CosmosStakingV1beta1QueryRedelegationsResponseFromJSONTyped(
    json,
    false,
  );
}

export function CosmosStakingV1beta1QueryRedelegationsResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosStakingV1beta1QueryRedelegationsResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    redelegationResponses: !exists(json, "redelegation_responses")
      ? undefined
      : (json["redelegation_responses"] as Array<any>).map(
          InlineResponse20028RedelegationResponsesFromJSON,
        ),
    pagination: !exists(json, "pagination")
      ? undefined
      : InlineResponse2002PaginationFromJSON(json["pagination"]),
  };
}

export function CosmosStakingV1beta1QueryRedelegationsResponseToJSON(
  value?: CosmosStakingV1beta1QueryRedelegationsResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    redelegation_responses:
      value.redelegationResponses === undefined
        ? undefined
        : (value.redelegationResponses as Array<any>).map(
            InlineResponse20028RedelegationResponsesToJSON,
          ),
    pagination: InlineResponse2002PaginationToJSON(value.pagination),
  };
}
