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
 * @interface OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDuration
 */
export interface OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDuration {
    /**
     * 
     * @type {string}
     * @memberof OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDuration
     */
    gaugeId?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDuration
     */
    duration?: string;
}

export function OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDurationFromJSON(json: any): OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDuration {
    return OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDurationFromJSONTyped(json, false);
}

export function OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDuration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'gaugeId': !exists(json, 'gauge_id') ? undefined : json['gauge_id'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
    };
}

export function OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDurationToJSON(value?: OsmosisPoolincentivesV1beta1QueryGaugeIdsResponseGaugeIdWithDuration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'gauge_id': value.gaugeId,
        'duration': value.duration,
    };
}


