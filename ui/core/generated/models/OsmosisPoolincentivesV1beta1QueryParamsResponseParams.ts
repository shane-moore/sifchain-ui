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
 * @interface OsmosisPoolincentivesV1beta1QueryParamsResponseParams
 */
export interface OsmosisPoolincentivesV1beta1QueryParamsResponseParams {
    /**
     * minted_denom is the denomination of the coin expected to be minted by the
     * minting module. Pool-incentives module doesn’t actually mint the coin
     * itself, but rather manages the distribution of coins that matches the
     * defined minted_denom.
     * @type {string}
     * @memberof OsmosisPoolincentivesV1beta1QueryParamsResponseParams
     */
    mintedDenom?: string;
}

export function OsmosisPoolincentivesV1beta1QueryParamsResponseParamsFromJSON(json: any): OsmosisPoolincentivesV1beta1QueryParamsResponseParams {
    return OsmosisPoolincentivesV1beta1QueryParamsResponseParamsFromJSONTyped(json, false);
}

export function OsmosisPoolincentivesV1beta1QueryParamsResponseParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): OsmosisPoolincentivesV1beta1QueryParamsResponseParams {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mintedDenom': !exists(json, 'minted_denom') ? undefined : json['minted_denom'],
    };
}

export function OsmosisPoolincentivesV1beta1QueryParamsResponseParamsToJSON(value?: OsmosisPoolincentivesV1beta1QueryParamsResponseParams | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'minted_denom': value.mintedDenom,
    };
}


