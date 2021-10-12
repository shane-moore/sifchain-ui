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
    OsmosisLockupAccountLockedLongerDurationDenomResponseLocks,
    OsmosisLockupAccountLockedLongerDurationDenomResponseLocksFromJSON,
    OsmosisLockupAccountLockedLongerDurationDenomResponseLocksFromJSONTyped,
    OsmosisLockupAccountLockedLongerDurationDenomResponseLocksToJSON,
} from './';

/**
 * 
 * @export
 * @interface OsmosisLockupLockedResponse
 */
export interface OsmosisLockupLockedResponse {
    /**
     * 
     * @type {OsmosisLockupAccountLockedLongerDurationDenomResponseLocks}
     * @memberof OsmosisLockupLockedResponse
     */
    lock?: OsmosisLockupAccountLockedLongerDurationDenomResponseLocks;
}

export function OsmosisLockupLockedResponseFromJSON(json: any): OsmosisLockupLockedResponse {
    return OsmosisLockupLockedResponseFromJSONTyped(json, false);
}

export function OsmosisLockupLockedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OsmosisLockupLockedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lock': !exists(json, 'lock') ? undefined : OsmosisLockupAccountLockedLongerDurationDenomResponseLocksFromJSON(json['lock']),
    };
}

export function OsmosisLockupLockedResponseToJSON(value?: OsmosisLockupLockedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lock': OsmosisLockupAccountLockedLongerDurationDenomResponseLocksToJSON(value.lock),
    };
}


