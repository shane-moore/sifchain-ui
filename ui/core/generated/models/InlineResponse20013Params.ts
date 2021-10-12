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
 * params defines the parameters of the module.
 * @export
 * @interface InlineResponse20013Params
 */
export interface InlineResponse20013Params {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20013Params
     */
    communityTax?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20013Params
     */
    baseProposerReward?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20013Params
     */
    bonusProposerReward?: string;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse20013Params
     */
    withdrawAddrEnabled?: boolean;
}

export function InlineResponse20013ParamsFromJSON(json: any): InlineResponse20013Params {
    return InlineResponse20013ParamsFromJSONTyped(json, false);
}

export function InlineResponse20013ParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20013Params {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'communityTax': !exists(json, 'community_tax') ? undefined : json['community_tax'],
        'baseProposerReward': !exists(json, 'base_proposer_reward') ? undefined : json['base_proposer_reward'],
        'bonusProposerReward': !exists(json, 'bonus_proposer_reward') ? undefined : json['bonus_proposer_reward'],
        'withdrawAddrEnabled': !exists(json, 'withdraw_addr_enabled') ? undefined : json['withdraw_addr_enabled'],
    };
}

export function InlineResponse20013ParamsToJSON(value?: InlineResponse20013Params | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'community_tax': value.communityTax,
        'base_proposer_reward': value.baseProposerReward,
        'bonus_proposer_reward': value.bonusProposerReward,
        'withdraw_addr_enabled': value.withdrawAddrEnabled,
    };
}


