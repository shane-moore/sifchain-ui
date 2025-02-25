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
 * PacketState defines the generic type necessary to retrieve and store
 * packet commitments, acknowledgements, and receipts.
 * Caller is responsible for knowing the context necessary to interpret this
 * state as a commitment, acknowledgement, or a receipt.
 * @export
 * @interface IbcCoreChannelV1PacketState
 */
export interface IbcCoreChannelV1PacketState {
  /**
   * channel port identifier.
   * @type {string}
   * @memberof IbcCoreChannelV1PacketState
   */
  portId?: string;
  /**
   * channel unique identifier.
   * @type {string}
   * @memberof IbcCoreChannelV1PacketState
   */
  channelId?: string;
  /**
   * packet sequence.
   * @type {string}
   * @memberof IbcCoreChannelV1PacketState
   */
  sequence?: string;
  /**
   * embedded data that represents packet state.
   * @type {string}
   * @memberof IbcCoreChannelV1PacketState
   */
  data?: string;
}

export function IbcCoreChannelV1PacketStateFromJSON(
  json: any,
): IbcCoreChannelV1PacketState {
  return IbcCoreChannelV1PacketStateFromJSONTyped(json, false);
}

export function IbcCoreChannelV1PacketStateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): IbcCoreChannelV1PacketState {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    portId: !exists(json, "port_id") ? undefined : json["port_id"],
    channelId: !exists(json, "channel_id") ? undefined : json["channel_id"],
    sequence: !exists(json, "sequence") ? undefined : json["sequence"],
    data: !exists(json, "data") ? undefined : json["data"],
  };
}

export function IbcCoreChannelV1PacketStateToJSON(
  value?: IbcCoreChannelV1PacketState | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    port_id: value.portId,
    channel_id: value.channelId,
    sequence: value.sequence,
    data: value.data,
  };
}
