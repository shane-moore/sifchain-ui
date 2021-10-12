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
 * 
 * @export
 * @interface OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPools
 */
export interface OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPools {
    /**
     * 
     * @type {string}
     * @memberof OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPools
     */
    poolId?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPools
     */
    lockableDuration?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPools
     */
    gaugeId?: string;
}

export function OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPoolsFromJSON(json: any): OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPools {
    return OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPoolsFromJSONTyped(json, false);
}

export function OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPoolsFromJSONTyped(json: any, ignoreDiscriminator: boolean): OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPools {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'poolId': !exists(json, 'pool_id') ? undefined : json['pool_id'],
        'lockableDuration': !exists(json, 'lockable_duration') ? undefined : json['lockable_duration'],
        'gaugeId': !exists(json, 'gauge_id') ? undefined : json['gauge_id'],
    };
}

export function OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPoolsToJSON(value?: OsmosisPoolincentivesV1beta1QueryIncentivizedPoolsResponseIncentivizedPools | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pool_id': value.poolId,
        'lockable_duration': value.lockableDuration,
        'gauge_id': value.gaugeId,
    };
}


