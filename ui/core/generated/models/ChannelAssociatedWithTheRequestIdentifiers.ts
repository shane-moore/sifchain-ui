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
  CounterpartyChannelEnd,
  CounterpartyChannelEndFromJSON,
  CounterpartyChannelEndFromJSONTyped,
  CounterpartyChannelEndToJSON,
} from "./";

/**
 * Channel defines pipeline for exactly-once packet delivery between specific
 * modules on separate blockchains, which has at least one end capable of
 * sending packets and one end capable of receiving packets.
 * @export
 * @interface ChannelAssociatedWithTheRequestIdentifiers
 */
export interface ChannelAssociatedWithTheRequestIdentifiers {
  /**
   * State defines if a channel is in one of the following states:
   * CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.
   *
   *  - STATE_UNINITIALIZED_UNSPECIFIED: Default State
   *  - STATE_INIT: A channel has just started the opening handshake.
   *  - STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.
   *  - STATE_OPEN: A channel has completed the handshake. Open channels are
   * ready to send and receive packets.
   *  - STATE_CLOSED: A channel has been closed and can no longer be used to send or receive
   * packets.
   * @type {string}
   * @memberof ChannelAssociatedWithTheRequestIdentifiers
   */
  state?: ChannelAssociatedWithTheRequestIdentifiersStateEnum;
  /**
   * - ORDER_NONE_UNSPECIFIED: zero-value for channel ordering
   *  - ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in
   * which they were sent.
   *  - ORDER_ORDERED: packets are delivered exactly in the order which they were sent
   * @type {string}
   * @memberof ChannelAssociatedWithTheRequestIdentifiers
   */
  ordering?: ChannelAssociatedWithTheRequestIdentifiersOrderingEnum;
  /**
   *
   * @type {CounterpartyChannelEnd}
   * @memberof ChannelAssociatedWithTheRequestIdentifiers
   */
  counterparty?: CounterpartyChannelEnd;
  /**
   *
   * @type {Array<string>}
   * @memberof ChannelAssociatedWithTheRequestIdentifiers
   */
  connectionHops?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ChannelAssociatedWithTheRequestIdentifiers
   */
  version?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum ChannelAssociatedWithTheRequestIdentifiersStateEnum {
  UninitializedUnspecified = "STATE_UNINITIALIZED_UNSPECIFIED",
  Init = "STATE_INIT",
  Tryopen = "STATE_TRYOPEN",
  Open = "STATE_OPEN",
  Closed = "STATE_CLOSED",
}
/**
 * @export
 * @enum {string}
 */
export enum ChannelAssociatedWithTheRequestIdentifiersOrderingEnum {
  NoneUnspecified = "ORDER_NONE_UNSPECIFIED",
  Unordered = "ORDER_UNORDERED",
  Ordered = "ORDER_ORDERED",
}

export function ChannelAssociatedWithTheRequestIdentifiersFromJSON(
  json: any,
): ChannelAssociatedWithTheRequestIdentifiers {
  return ChannelAssociatedWithTheRequestIdentifiersFromJSONTyped(json, false);
}

export function ChannelAssociatedWithTheRequestIdentifiersFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ChannelAssociatedWithTheRequestIdentifiers {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    state: !exists(json, "state") ? undefined : json["state"],
    ordering: !exists(json, "ordering") ? undefined : json["ordering"],
    counterparty: !exists(json, "counterparty")
      ? undefined
      : CounterpartyChannelEndFromJSON(json["counterparty"]),
    connectionHops: !exists(json, "connection_hops")
      ? undefined
      : json["connection_hops"],
    version: !exists(json, "version") ? undefined : json["version"],
  };
}

export function ChannelAssociatedWithTheRequestIdentifiersToJSON(
  value?: ChannelAssociatedWithTheRequestIdentifiers | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    state: value.state,
    ordering: value.ordering,
    counterparty: CounterpartyChannelEndToJSON(value.counterparty),
    connection_hops: value.connectionHops,
    version: value.version,
  };
}
