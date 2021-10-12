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

import { exists, mapValues } from '../runtime';
import {
    InlineResponse20032Hist,
    InlineResponse20032HistFromJSON,
    InlineResponse20032HistFromJSONTyped,
    InlineResponse20032HistToJSON,
} from './';

/**
 * QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
 * method.
 * @export
 * @interface InlineResponse20032
 */
export interface InlineResponse20032 {
    /**
     * 
     * @type {InlineResponse20032Hist}
     * @memberof InlineResponse20032
     */
    hist?: InlineResponse20032Hist;
}

export function InlineResponse20032FromJSON(json: any): InlineResponse20032 {
    return InlineResponse20032FromJSONTyped(json, false);
}

export function InlineResponse20032FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20032 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'hist': !exists(json, 'hist') ? undefined : InlineResponse20032HistFromJSON(json['hist']),
    };
}

export function InlineResponse20032ToJSON(value?: InlineResponse20032 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'hist': InlineResponse20032HistToJSON(value.hist),
    };
}


