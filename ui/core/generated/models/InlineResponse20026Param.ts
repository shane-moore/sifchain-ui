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
/**
 * param defines the queried parameter.
 * @export
 * @interface InlineResponse20026Param
 */
export interface InlineResponse20026Param {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20026Param
     */
    subspace?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20026Param
     */
    key?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20026Param
     */
    value?: string;
}

export function InlineResponse20026ParamFromJSON(json: any): InlineResponse20026Param {
    return InlineResponse20026ParamFromJSONTyped(json, false);
}

export function InlineResponse20026ParamFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20026Param {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'subspace': !exists(json, 'subspace') ? undefined : json['subspace'],
        'key': !exists(json, 'key') ? undefined : json['key'],
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function InlineResponse20026ParamToJSON(value?: InlineResponse20026Param | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'subspace': value.subspace,
        'key': value.key,
        'value': value.value,
    };
}


