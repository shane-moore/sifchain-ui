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
 * tally defines the requested tally.
 * @export
 * @interface InlineResponse20023Tally
 */
export interface InlineResponse20023Tally {
  /**
   *
   * @type {string}
   * @memberof InlineResponse20023Tally
   */
  yes?: string;
  /**
   *
   * @type {string}
   * @memberof InlineResponse20023Tally
   */
  abstain?: string;
  /**
   *
   * @type {string}
   * @memberof InlineResponse20023Tally
   */
  no?: string;
  /**
   *
   * @type {string}
   * @memberof InlineResponse20023Tally
   */
  noWithVeto?: string;
}

export function InlineResponse20023TallyFromJSON(
  json: any,
): InlineResponse20023Tally {
  return InlineResponse20023TallyFromJSONTyped(json, false);
}

export function InlineResponse20023TallyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse20023Tally {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    yes: !exists(json, "yes") ? undefined : json["yes"],
    abstain: !exists(json, "abstain") ? undefined : json["abstain"],
    no: !exists(json, "no") ? undefined : json["no"],
    noWithVeto: !exists(json, "no_with_veto")
      ? undefined
      : json["no_with_veto"],
  };
}

export function InlineResponse20023TallyToJSON(
  value?: InlineResponse20023Tally | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    yes: value.yes,
    abstain: value.abstain,
    no: value.no,
    no_with_veto: value.noWithVeto,
  };
}
