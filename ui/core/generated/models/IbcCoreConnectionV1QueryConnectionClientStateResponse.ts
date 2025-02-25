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
  ClientStateAssociatedWithTheChannel,
  ClientStateAssociatedWithTheChannelFromJSON,
  ClientStateAssociatedWithTheChannelFromJSONTyped,
  ClientStateAssociatedWithTheChannelToJSON,
  HeightAtWhichTheProofWasRetrieved,
  HeightAtWhichTheProofWasRetrievedFromJSON,
  HeightAtWhichTheProofWasRetrievedFromJSONTyped,
  HeightAtWhichTheProofWasRetrievedToJSON,
} from "./";

/**
 *
 * @export
 * @interface IbcCoreConnectionV1QueryConnectionClientStateResponse
 */
export interface IbcCoreConnectionV1QueryConnectionClientStateResponse {
  /**
   *
   * @type {ClientStateAssociatedWithTheChannel}
   * @memberof IbcCoreConnectionV1QueryConnectionClientStateResponse
   */
  identifiedClientState?: ClientStateAssociatedWithTheChannel;
  /**
   *
   * @type {string}
   * @memberof IbcCoreConnectionV1QueryConnectionClientStateResponse
   */
  proof?: string;
  /**
   *
   * @type {HeightAtWhichTheProofWasRetrieved}
   * @memberof IbcCoreConnectionV1QueryConnectionClientStateResponse
   */
  proofHeight?: HeightAtWhichTheProofWasRetrieved;
}

export function IbcCoreConnectionV1QueryConnectionClientStateResponseFromJSON(
  json: any,
): IbcCoreConnectionV1QueryConnectionClientStateResponse {
  return IbcCoreConnectionV1QueryConnectionClientStateResponseFromJSONTyped(
    json,
    false,
  );
}

export function IbcCoreConnectionV1QueryConnectionClientStateResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): IbcCoreConnectionV1QueryConnectionClientStateResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    identifiedClientState: !exists(json, "identified_client_state")
      ? undefined
      : ClientStateAssociatedWithTheChannelFromJSON(
          json["identified_client_state"],
        ),
    proof: !exists(json, "proof") ? undefined : json["proof"],
    proofHeight: !exists(json, "proof_height")
      ? undefined
      : HeightAtWhichTheProofWasRetrievedFromJSON(json["proof_height"]),
  };
}

export function IbcCoreConnectionV1QueryConnectionClientStateResponseToJSON(
  value?: IbcCoreConnectionV1QueryConnectionClientStateResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    identified_client_state: ClientStateAssociatedWithTheChannelToJSON(
      value.identifiedClientState,
    ),
    proof: value.proof,
    proof_height: HeightAtWhichTheProofWasRetrievedToJSON(value.proofHeight),
  };
}
