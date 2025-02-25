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
  InlineResponse20018DepositParams,
  InlineResponse20018DepositParamsFromJSON,
  InlineResponse20018DepositParamsFromJSONTyped,
  InlineResponse20018DepositParamsToJSON,
  InlineResponse20018TallyParams,
  InlineResponse20018TallyParamsFromJSON,
  InlineResponse20018TallyParamsFromJSONTyped,
  InlineResponse20018TallyParamsToJSON,
  InlineResponse20018VotingParams,
  InlineResponse20018VotingParamsFromJSON,
  InlineResponse20018VotingParamsFromJSONTyped,
  InlineResponse20018VotingParamsToJSON,
} from "./";

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 * @export
 * @interface CosmosGovV1beta1QueryParamsResponse
 */
export interface CosmosGovV1beta1QueryParamsResponse {
  /**
   *
   * @type {InlineResponse20018VotingParams}
   * @memberof CosmosGovV1beta1QueryParamsResponse
   */
  votingParams?: InlineResponse20018VotingParams;
  /**
   *
   * @type {InlineResponse20018DepositParams}
   * @memberof CosmosGovV1beta1QueryParamsResponse
   */
  depositParams?: InlineResponse20018DepositParams;
  /**
   *
   * @type {InlineResponse20018TallyParams}
   * @memberof CosmosGovV1beta1QueryParamsResponse
   */
  tallyParams?: InlineResponse20018TallyParams;
}

export function CosmosGovV1beta1QueryParamsResponseFromJSON(
  json: any,
): CosmosGovV1beta1QueryParamsResponse {
  return CosmosGovV1beta1QueryParamsResponseFromJSONTyped(json, false);
}

export function CosmosGovV1beta1QueryParamsResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CosmosGovV1beta1QueryParamsResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    votingParams: !exists(json, "voting_params")
      ? undefined
      : InlineResponse20018VotingParamsFromJSON(json["voting_params"]),
    depositParams: !exists(json, "deposit_params")
      ? undefined
      : InlineResponse20018DepositParamsFromJSON(json["deposit_params"]),
    tallyParams: !exists(json, "tally_params")
      ? undefined
      : InlineResponse20018TallyParamsFromJSON(json["tally_params"]),
  };
}

export function CosmosGovV1beta1QueryParamsResponseToJSON(
  value?: CosmosGovV1beta1QueryParamsResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    voting_params: InlineResponse20018VotingParamsToJSON(value.votingParams),
    deposit_params: InlineResponse20018DepositParamsToJSON(value.depositParams),
    tally_params: InlineResponse20018TallyParamsToJSON(value.tallyParams),
  };
}
