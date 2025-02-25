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
  ChannelAssociatedWithTheRequestIdentifiers,
  ChannelAssociatedWithTheRequestIdentifiersFromJSON,
  ChannelAssociatedWithTheRequestIdentifiersFromJSONTyped,
  ChannelAssociatedWithTheRequestIdentifiersToJSON,
  HeightAtWhichTheProofWasRetrieved,
  HeightAtWhichTheProofWasRetrievedFromJSON,
  HeightAtWhichTheProofWasRetrievedFromJSONTyped,
  HeightAtWhichTheProofWasRetrievedToJSON,
} from "./";

/**
 * QueryChannelResponse is the response type for the Query/Channel RPC method.
 * Besides the Channel end, it includes a proof and the height from which the
 * proof was retrieved.
 * @export
 * @interface InlineResponse20042
 */
export interface InlineResponse20042 {
  /**
   *
   * @type {ChannelAssociatedWithTheRequestIdentifiers}
   * @memberof InlineResponse20042
   */
  channel?: ChannelAssociatedWithTheRequestIdentifiers;
  /**
   *
   * @type {string}
   * @memberof InlineResponse20042
   */
  proof?: string;
  /**
   *
   * @type {HeightAtWhichTheProofWasRetrieved}
   * @memberof InlineResponse20042
   */
  proofHeight?: HeightAtWhichTheProofWasRetrieved;
}

export function InlineResponse20042FromJSON(json: any): InlineResponse20042 {
  return InlineResponse20042FromJSONTyped(json, false);
}

export function InlineResponse20042FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse20042 {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    channel: !exists(json, "channel")
      ? undefined
      : ChannelAssociatedWithTheRequestIdentifiersFromJSON(json["channel"]),
    proof: !exists(json, "proof") ? undefined : json["proof"],
    proofHeight: !exists(json, "proof_height")
      ? undefined
      : HeightAtWhichTheProofWasRetrievedFromJSON(json["proof_height"]),
  };
}

export function InlineResponse20042ToJSON(
  value?: InlineResponse20042 | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    channel: ChannelAssociatedWithTheRequestIdentifiersToJSON(value.channel),
    proof: value.proof,
    proof_height: HeightAtWhichTheProofWasRetrievedToJSON(value.proofHeight),
  };
}
