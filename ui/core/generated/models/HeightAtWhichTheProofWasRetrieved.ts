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
 * Normally the RevisionHeight is incremented at each height while keeping RevisionNumber
 * the same. However some consensus algorithms may choose to reset the
 * height in certain conditions e.g. hard forks, state-machine breaking changes
 * In these cases, the RevisionNumber is incremented so that height continues to
 * be monitonically increasing even as the RevisionHeight gets reset
 * @export
 * @interface HeightAtWhichTheProofWasRetrieved
 */
export interface HeightAtWhichTheProofWasRetrieved {
  /**
   *
   * @type {string}
   * @memberof HeightAtWhichTheProofWasRetrieved
   */
  revisionNumber?: string;
  /**
   *
   * @type {string}
   * @memberof HeightAtWhichTheProofWasRetrieved
   */
  revisionHeight?: string;
}

export function HeightAtWhichTheProofWasRetrievedFromJSON(
  json: any,
): HeightAtWhichTheProofWasRetrieved {
  return HeightAtWhichTheProofWasRetrievedFromJSONTyped(json, false);
}

export function HeightAtWhichTheProofWasRetrievedFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): HeightAtWhichTheProofWasRetrieved {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    revisionNumber: !exists(json, "revision_number")
      ? undefined
      : json["revision_number"],
    revisionHeight: !exists(json, "revision_height")
      ? undefined
      : json["revision_height"],
  };
}

export function HeightAtWhichTheProofWasRetrievedToJSON(
  value?: HeightAtWhichTheProofWasRetrieved | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    revision_number: value.revisionNumber,
    revision_height: value.revisionHeight,
  };
}
