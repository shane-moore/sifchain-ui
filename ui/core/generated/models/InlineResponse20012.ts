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
 * QueryDelegatorWithdrawAddressResponse is the response type for the
 * Query/DelegatorWithdrawAddress RPC method.
 * @export
 * @interface InlineResponse20012
 */
export interface InlineResponse20012 {
    /**
     * withdraw_address defines the delegator address to query for.
     * @type {string}
     * @memberof InlineResponse20012
     */
    withdrawAddress?: string;
}

export function InlineResponse20012FromJSON(json: any): InlineResponse20012 {
    return InlineResponse20012FromJSONTyped(json, false);
}

export function InlineResponse20012FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20012 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'withdrawAddress': !exists(json, 'withdraw_address') ? undefined : json['withdraw_address'],
    };
}

export function InlineResponse20012ToJSON(value?: InlineResponse20012 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'withdraw_address': value.withdrawAddress,
    };
}


