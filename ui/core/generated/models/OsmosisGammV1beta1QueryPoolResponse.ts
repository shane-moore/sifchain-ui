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
    InlineResponseDefaultDetails,
    InlineResponseDefaultDetailsFromJSON,
    InlineResponseDefaultDetailsFromJSONTyped,
    InlineResponseDefaultDetailsToJSON,
} from './';

/**
 * 
 * @export
 * @interface OsmosisGammV1beta1QueryPoolResponse
 */
export interface OsmosisGammV1beta1QueryPoolResponse {
    /**
     * 
     * @type {InlineResponseDefaultDetails}
     * @memberof OsmosisGammV1beta1QueryPoolResponse
     */
    pool?: InlineResponseDefaultDetails;
}

export function OsmosisGammV1beta1QueryPoolResponseFromJSON(json: any): OsmosisGammV1beta1QueryPoolResponse {
    return OsmosisGammV1beta1QueryPoolResponseFromJSONTyped(json, false);
}

export function OsmosisGammV1beta1QueryPoolResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OsmosisGammV1beta1QueryPoolResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pool': !exists(json, 'pool') ? undefined : InlineResponseDefaultDetailsFromJSON(json['pool']),
    };
}

export function OsmosisGammV1beta1QueryPoolResponseToJSON(value?: OsmosisGammV1beta1QueryPoolResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pool': InlineResponseDefaultDetailsToJSON(value.pool),
    };
}


