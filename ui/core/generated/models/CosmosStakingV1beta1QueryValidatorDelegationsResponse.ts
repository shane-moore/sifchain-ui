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
    InlineResponse20027DelegationResponses,
    InlineResponse20027DelegationResponsesFromJSON,
    InlineResponse20027DelegationResponsesFromJSONTyped,
    InlineResponse20027DelegationResponsesToJSON,
    InlineResponse2002Pagination,
    InlineResponse2002PaginationFromJSON,
    InlineResponse2002PaginationFromJSONTyped,
    InlineResponse2002PaginationToJSON,
} from './';

/**
 * 
 * @export
 * @interface CosmosStakingV1beta1QueryValidatorDelegationsResponse
 */
export interface CosmosStakingV1beta1QueryValidatorDelegationsResponse {
    /**
     * 
     * @type {Array<InlineResponse20027DelegationResponses>}
     * @memberof CosmosStakingV1beta1QueryValidatorDelegationsResponse
     */
    delegationResponses?: Array<InlineResponse20027DelegationResponses>;
    /**
     * 
     * @type {InlineResponse2002Pagination}
     * @memberof CosmosStakingV1beta1QueryValidatorDelegationsResponse
     */
    pagination?: InlineResponse2002Pagination;
}

export function CosmosStakingV1beta1QueryValidatorDelegationsResponseFromJSON(json: any): CosmosStakingV1beta1QueryValidatorDelegationsResponse {
    return CosmosStakingV1beta1QueryValidatorDelegationsResponseFromJSONTyped(json, false);
}

export function CosmosStakingV1beta1QueryValidatorDelegationsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CosmosStakingV1beta1QueryValidatorDelegationsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'delegationResponses': !exists(json, 'delegation_responses') ? undefined : ((json['delegation_responses'] as Array<any>).map(InlineResponse20027DelegationResponsesFromJSON)),
        'pagination': !exists(json, 'pagination') ? undefined : InlineResponse2002PaginationFromJSON(json['pagination']),
    };
}

export function CosmosStakingV1beta1QueryValidatorDelegationsResponseToJSON(value?: CosmosStakingV1beta1QueryValidatorDelegationsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'delegation_responses': value.delegationResponses === undefined ? undefined : ((value.delegationResponses as Array<any>).map(InlineResponse20027DelegationResponsesToJSON)),
        'pagination': InlineResponse2002PaginationToJSON(value.pagination),
    };
}


