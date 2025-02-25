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
  InlineResponse2002Balances,
  InlineResponse2002BalancesFromJSON,
  InlineResponse2002BalancesFromJSONTyped,
  InlineResponse2002BalancesToJSON,
} from "./";

/**
 *
 * @export
 * @interface AClaimRecordsIsTheMetadataOfClaimDataPerAddress
 */
export interface AClaimRecordsIsTheMetadataOfClaimDataPerAddress {
  /**
   *
   * @type {string}
   * @memberof AClaimRecordsIsTheMetadataOfClaimDataPerAddress
   */
  address?: string;
  /**
   *
   * @type {Array<InlineResponse2002Balances>}
   * @memberof AClaimRecordsIsTheMetadataOfClaimDataPerAddress
   */
  initialClaimableAmount?: Array<InlineResponse2002Balances>;
  /**
   *
   * @type {Array<boolean>}
   * @memberof AClaimRecordsIsTheMetadataOfClaimDataPerAddress
   */
  actionCompleted?: Array<boolean>;
}

export function AClaimRecordsIsTheMetadataOfClaimDataPerAddressFromJSON(
  json: any,
): AClaimRecordsIsTheMetadataOfClaimDataPerAddress {
  return AClaimRecordsIsTheMetadataOfClaimDataPerAddressFromJSONTyped(
    json,
    false,
  );
}

export function AClaimRecordsIsTheMetadataOfClaimDataPerAddressFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): AClaimRecordsIsTheMetadataOfClaimDataPerAddress {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    address: !exists(json, "address") ? undefined : json["address"],
    initialClaimableAmount: !exists(json, "initial_claimable_amount")
      ? undefined
      : (json["initial_claimable_amount"] as Array<any>).map(
          InlineResponse2002BalancesFromJSON,
        ),
    actionCompleted: !exists(json, "action_completed")
      ? undefined
      : json["action_completed"],
  };
}

export function AClaimRecordsIsTheMetadataOfClaimDataPerAddressToJSON(
  value?: AClaimRecordsIsTheMetadataOfClaimDataPerAddress | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    address: value.address,
    initial_claimable_amount:
      value.initialClaimableAmount === undefined
        ? undefined
        : (value.initialClaimableAmount as Array<any>).map(
            InlineResponse2002BalancesToJSON,
          ),
    action_completed: value.actionCompleted,
  };
}
