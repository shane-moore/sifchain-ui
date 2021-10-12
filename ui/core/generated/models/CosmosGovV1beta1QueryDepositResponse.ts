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
    InlineResponse20022Deposit,
    InlineResponse20022DepositFromJSON,
    InlineResponse20022DepositFromJSONTyped,
    InlineResponse20022DepositToJSON,
} from './';

/**
 * QueryDepositResponse is the response type for the Query/Deposit RPC method.
 * @export
 * @interface CosmosGovV1beta1QueryDepositResponse
 */
export interface CosmosGovV1beta1QueryDepositResponse {
    /**
     * 
     * @type {InlineResponse20022Deposit}
     * @memberof CosmosGovV1beta1QueryDepositResponse
     */
    deposit?: InlineResponse20022Deposit;
}

export function CosmosGovV1beta1QueryDepositResponseFromJSON(json: any): CosmosGovV1beta1QueryDepositResponse {
    return CosmosGovV1beta1QueryDepositResponseFromJSONTyped(json, false);
}

export function CosmosGovV1beta1QueryDepositResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CosmosGovV1beta1QueryDepositResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'deposit': !exists(json, 'deposit') ? undefined : InlineResponse20022DepositFromJSON(json['deposit']),
    };
}

export function CosmosGovV1beta1QueryDepositResponseToJSON(value?: CosmosGovV1beta1QueryDepositResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'deposit': InlineResponse20022DepositToJSON(value.deposit),
    };
}


