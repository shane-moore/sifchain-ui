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
 * DenomUnit represents a struct that describes a given
 * denomination unit of the basic token.
 * @export
 * @interface CosmosBankV1beta1DenomUnit
 */
export interface CosmosBankV1beta1DenomUnit {
    /**
     * denom represents the string name of the given denom unit (e.g uatom).
     * @type {string}
     * @memberof CosmosBankV1beta1DenomUnit
     */
    denom?: string;
    /**
     * exponent represents power of 10 exponent that one must
     * raise the base_denom to in order to equal the given DenomUnit's denom
     * 1 denom = 1^exponent base_denom
     * (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with
     * exponent = 6, thus: 1 atom = 10^6 uatom).
     * @type {number}
     * @memberof CosmosBankV1beta1DenomUnit
     */
    exponent?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof CosmosBankV1beta1DenomUnit
     */
    aliases?: Array<string>;
}

export function CosmosBankV1beta1DenomUnitFromJSON(json: any): CosmosBankV1beta1DenomUnit {
    return CosmosBankV1beta1DenomUnitFromJSONTyped(json, false);
}

export function CosmosBankV1beta1DenomUnitFromJSONTyped(json: any, ignoreDiscriminator: boolean): CosmosBankV1beta1DenomUnit {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'denom': !exists(json, 'denom') ? undefined : json['denom'],
        'exponent': !exists(json, 'exponent') ? undefined : json['exponent'],
        'aliases': !exists(json, 'aliases') ? undefined : json['aliases'],
    };
}

export function CosmosBankV1beta1DenomUnitToJSON(value?: CosmosBankV1beta1DenomUnit | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'denom': value.denom,
        'exponent': value.exponent,
        'aliases': value.aliases,
    };
}


