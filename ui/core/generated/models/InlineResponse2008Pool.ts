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
 * DecCoin defines a token with a denomination and a decimal amount.
 * 
 * NOTE: The amount field is an Dec which implements the custom method
 * signatures required by gogoproto.
 * @export
 * @interface InlineResponse2008Pool
 */
export interface InlineResponse2008Pool {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2008Pool
     */
    denom?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2008Pool
     */
    amount?: string;
}

export function InlineResponse2008PoolFromJSON(json: any): InlineResponse2008Pool {
    return InlineResponse2008PoolFromJSONTyped(json, false);
}

export function InlineResponse2008PoolFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2008Pool {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'denom': !exists(json, 'denom') ? undefined : json['denom'],
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
    };
}

export function InlineResponse2008PoolToJSON(value?: InlineResponse2008Pool | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'denom': value.denom,
        'amount': value.amount,
    };
}


