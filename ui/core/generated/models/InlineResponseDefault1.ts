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
  InlineResponseDefault1Details,
  InlineResponseDefault1DetailsFromJSON,
  InlineResponseDefault1DetailsFromJSONTyped,
  InlineResponseDefault1DetailsToJSON,
} from "./";

/**
 *
 * @export
 * @interface InlineResponseDefault1
 */
export interface InlineResponseDefault1 {
  /**
   *
   * @type {string}
   * @memberof InlineResponseDefault1
   */
  error?: string;
  /**
   *
   * @type {number}
   * @memberof InlineResponseDefault1
   */
  code?: number;
  /**
   *
   * @type {string}
   * @memberof InlineResponseDefault1
   */
  message?: string;
  /**
   *
   * @type {Array<InlineResponseDefault1Details>}
   * @memberof InlineResponseDefault1
   */
  details?: Array<InlineResponseDefault1Details>;
}

export function InlineResponseDefault1FromJSON(
  json: any,
): InlineResponseDefault1 {
  return InlineResponseDefault1FromJSONTyped(json, false);
}

export function InlineResponseDefault1FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponseDefault1 {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    error: !exists(json, "error") ? undefined : json["error"],
    code: !exists(json, "code") ? undefined : json["code"],
    message: !exists(json, "message") ? undefined : json["message"],
    details: !exists(json, "details")
      ? undefined
      : (json["details"] as Array<any>).map(
          InlineResponseDefault1DetailsFromJSON,
        ),
  };
}

export function InlineResponseDefault1ToJSON(
  value?: InlineResponseDefault1 | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    error: value.error,
    code: value.code,
    message: value.message,
    details:
      value.details === undefined
        ? undefined
        : (value.details as Array<any>).map(
            InlineResponseDefault1DetailsToJSON,
          ),
  };
}
