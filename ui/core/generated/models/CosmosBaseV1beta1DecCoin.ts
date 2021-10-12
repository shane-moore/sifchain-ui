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
 * @interface CosmosBaseV1beta1DecCoin
 */
export interface CosmosBaseV1beta1DecCoin {
    /**
     * 
     * @type {string}
     * @memberof CosmosBaseV1beta1DecCoin
     */
    denom?: string;
    /**
     * 
     * @type {string}
     * @memberof CosmosBaseV1beta1DecCoin
     */
    amount?: string;
}

export function CosmosBaseV1beta1DecCoinFromJSON(json: any): CosmosBaseV1beta1DecCoin {
    return CosmosBaseV1beta1DecCoinFromJSONTyped(json, false);
}

export function CosmosBaseV1beta1DecCoinFromJSONTyped(json: any, ignoreDiscriminator: boolean): CosmosBaseV1beta1DecCoin {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'denom': !exists(json, 'denom') ? undefined : json['denom'],
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
    };
}

export function CosmosBaseV1beta1DecCoinToJSON(value?: CosmosBaseV1beta1DecCoin | null): any {
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


