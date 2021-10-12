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
    InlineResponse2008Pool,
    InlineResponse2008PoolFromJSON,
    InlineResponse2008PoolFromJSONTyped,
    InlineResponse2008PoolToJSON,
} from './';

/**
 * QueryDelegationRewardsResponse is the response type for the
 * Query/DelegationRewards RPC method.
 * @export
 * @interface InlineResponse20010
 */
export interface InlineResponse20010 {
    /**
     * rewards defines the rewards accrued by a delegation.
     * @type {Array<InlineResponse2008Pool>}
     * @memberof InlineResponse20010
     */
    rewards?: Array<InlineResponse2008Pool>;
}

export function InlineResponse20010FromJSON(json: any): InlineResponse20010 {
    return InlineResponse20010FromJSONTyped(json, false);
}

export function InlineResponse20010FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20010 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'rewards': !exists(json, 'rewards') ? undefined : ((json['rewards'] as Array<any>).map(InlineResponse2008PoolFromJSON)),
    };
}

export function InlineResponse20010ToJSON(value?: InlineResponse20010 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'rewards': value.rewards === undefined ? undefined : ((value.rewards as Array<any>).map(InlineResponse2008PoolToJSON)),
    };
}


