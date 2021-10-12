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
 * @interface DistributionProportionsDefinesTheProportionOfTheMintedDenom
 */
export interface DistributionProportionsDefinesTheProportionOfTheMintedDenom {
    /**
     * staking defines the proportion of the minted minted_denom that is to be
     * allocated as staking rewards.
     * @type {string}
     * @memberof DistributionProportionsDefinesTheProportionOfTheMintedDenom
     */
    staking?: string;
    /**
     * pool_incentives defines the proportion of the minted minted_denom that is
     * to be allocated as pool incentives.
     * @type {string}
     * @memberof DistributionProportionsDefinesTheProportionOfTheMintedDenom
     */
    poolIncentives?: string;
    /**
     * developer_rewards defines the proportion of the minted minted_denom that is
     * to be allocated to developer rewards address.
     * @type {string}
     * @memberof DistributionProportionsDefinesTheProportionOfTheMintedDenom
     */
    developerRewards?: string;
    /**
     * community_pool defines the proportion of the minted minted_denom that is
     * to be allocated to the community pool.
     * @type {string}
     * @memberof DistributionProportionsDefinesTheProportionOfTheMintedDenom
     */
    communityPool?: string;
}

export function DistributionProportionsDefinesTheProportionOfTheMintedDenomFromJSON(json: any): DistributionProportionsDefinesTheProportionOfTheMintedDenom {
    return DistributionProportionsDefinesTheProportionOfTheMintedDenomFromJSONTyped(json, false);
}

export function DistributionProportionsDefinesTheProportionOfTheMintedDenomFromJSONTyped(json: any, ignoreDiscriminator: boolean): DistributionProportionsDefinesTheProportionOfTheMintedDenom {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'staking': !exists(json, 'staking') ? undefined : json['staking'],
        'poolIncentives': !exists(json, 'pool_incentives') ? undefined : json['pool_incentives'],
        'developerRewards': !exists(json, 'developer_rewards') ? undefined : json['developer_rewards'],
        'communityPool': !exists(json, 'community_pool') ? undefined : json['community_pool'],
    };
}

export function DistributionProportionsDefinesTheProportionOfTheMintedDenomToJSON(value?: DistributionProportionsDefinesTheProportionOfTheMintedDenom | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'staking': value.staking,
        'pool_incentives': value.poolIncentives,
        'developer_rewards': value.developerRewards,
        'community_pool': value.communityPool,
    };
}


